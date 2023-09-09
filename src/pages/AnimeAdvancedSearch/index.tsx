import {
  Box,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import FilterDatePicker from "../../components/FilterDatePicker";
import FilterSelect from "../../components/FilterSelect";
import ShowMore from "../../components/ShowMore";
import {
  anime_search_query_rating,
  anime_search_query_status,
  anime_search_query_type,
} from "../../generated/jikan";
import { anime_search_param } from "../../generated/jikan/models/anime_search";
import { removeNanAndUndefined } from "../../helpers/object";
import { useAdvancedAnimeSearch } from "../../hooks/useAdvancedAnimeSearch";
import { useAnimeGenres } from "../../hooks/useAnimeGenres";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useFlipFlop } from "../../hooks/useFlipFlop";
import AnimeTemplatePage from "../../templates/AnimeTemplate";

const AnimeAdvancedSearchPage: React.FC = () => {
  useDocumentTitle("Search Anime - ANIWIKI");
  const [enabled, , , toggleEnabled] = useFlipFlop(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [searchFilter, setSearchFilter] = useState<anime_search_param>(
    removeNanAndUndefined({
      q: searchParams.get("q") ?? undefined,
      type: (searchParams.get("type") as anime_search_query_type) ?? undefined,
      minScore: Number(searchParams.get("minScore") ?? undefined),
      maxScore: Number(searchParams.get("maxScore") ?? undefined),
      status:
        (searchParams.get("status") as anime_search_query_status) ?? undefined,
      rating:
        (searchParams.get("rating") as anime_search_query_rating) ?? undefined,
      startDate: searchParams.get("startDate") ?? undefined,
      endDate: searchParams.get("endDate") ?? undefined,
      genres: searchParams.get("genres") ?? undefined,
      page: Number(searchParams.get("page") ?? undefined),
    })
  );
  const searchAnimesResult = useAdvancedAnimeSearch(
    searchFilter,
    searchParams.size !== 0
  );
  const animeGenresResult = useAnimeGenres();

  const sortedAnimeGenres = useMemo(
    () =>
      animeGenresResult?.sort(
        (a, b) => a.name?.toString().localeCompare(b.name ?? "") ?? 0
      ),
    [animeGenresResult]
  );

  const searchAnimes = searchAnimesResult?.data;
  const isLastPage = !searchAnimesResult?.pagination?.has_next_page;
  const currentPage = searchAnimesResult?.pagination?.current_page;

  const handleTypeChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as anime_search_query_type;
    setSearchFilter({ ...searchFilter, type: selectedType });
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const selectedStatus = event.target.value as anime_search_query_status;
    setSearchFilter({ ...searchFilter, status: selectedStatus });
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    const selectedRating = event.target.value as anime_search_query_rating;
    setSearchFilter({ ...searchFilter, rating: selectedRating });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter({ ...searchFilter, q: event.target.value });
  };

  const handleScoreChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    setSearchFilter({
      ...searchFilter,
      minScore: value[0],
      maxScore: value[1],
    });
  };

  const handleSearch = () => {
    const filteredSearchFilter = removeNanAndUndefined(searchFilter);
    const newParams = Object.entries(filteredSearchFilter).reduce(
      (params, [key, value]) => {
        if (value) params.append(key, value.toString());
        return params;
      },
      new URLSearchParams()
    );
    setSearchParams(newParams);
    return newParams;
  };

  const clearFilter = () => {
    setSearchFilter({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Listen for Enter key press
      const newParams: URLSearchParams = handleSearch();
      window.location.search = newParams.toString();
    }
  };

  const animeGenresMap = sortedAnimeGenres
    ?.slice(0, !enabled ? 10 : -1)
    .map((genre) => {
      const genresArray = searchFilter.genres?.split(",") ?? [];
      const handleGenreChange = () => {
        const index = genresArray.indexOf(String(genre.mal_id));
        const newGenres = genresArray.includes(String(genre.mal_id))
          ? genresArray.filter((_, i) => i !== index)
          : [...genresArray, String(genre.mal_id)];
        setSearchFilter({ ...searchFilter, genres: newGenres.toString() });
      };
      return (
        <FormControlLabel
          key={`${genre.mal_id}`}
          sx={{ width: "fit-content" }}
          control={
            <Checkbox checked={genresArray.includes(String(genre.mal_id))} />
          }
          label={`${genre.name}`}
          onChange={handleGenreChange}
        />
      );
    });
  return (
    <main>
      <div className="content">
        <Box
          component="form"
          sx={{ m: 1, gap: ".5em" }}
          className="flex column"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1>Filter</h1>
          <ShowMore
            showMoreAltText="Show Advanced Filter"
            showLessAltText="Hide Advanced Filter"
            isShowMore={enabled}
            toggleShowMore={toggleEnabled}
          />
          <TextField
            name="q"
            label="Title"
            variant="outlined"
            value={searchFilter.q || ""}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            fullWidth
          />
          {enabled && (
            <>
              <Box sx={{ gap: ".5em" }} className="flex">
                <FilterSelect
                  label="Type"
                  value={searchFilter.type}
                  options={[
                    { label: "Movie", value: anime_search_query_type.MOVIE },
                    { label: "Music", value: anime_search_query_type.MUSIC },
                    { label: "ONA", value: anime_search_query_type.ONA },
                    { label: "OVA", value: anime_search_query_type.OVA },
                    {
                      label: "Special",
                      value: anime_search_query_type.SPECIAL,
                    },
                    { label: "TV", value: anime_search_query_type.TV },
                  ]}
                  onChange={handleTypeChange}
                />

                <FilterSelect
                  label="Status"
                  value={searchFilter.status}
                  options={[
                    {
                      label: "Airing",
                      value: anime_search_query_status.AIRING,
                    },
                    {
                      label: "Completed",
                      value: anime_search_query_status.COMPLETE,
                    },
                    {
                      label: "Upcoming",
                      value: anime_search_query_status.UPCOMING,
                    },
                  ]}
                  onChange={handleStatusChange}
                />

                <FilterSelect
                  label="Rating"
                  value={searchFilter.rating}
                  options={[
                    {
                      label: "G - All Ages",
                      value: anime_search_query_rating.G,
                    },
                    {
                      label: "PG - Children",
                      value: anime_search_query_rating.PG,
                    },
                    {
                      label: "PG-13 - Teens 13 or older",
                      value: anime_search_query_rating.PG13,
                    },
                    {
                      label: "R - 17+ (violence & profanity)",
                      value: anime_search_query_rating.R17,
                    },
                    {
                      label: "R+ - Mild Nudity",
                      value: anime_search_query_rating.R,
                    },
                    {
                      label: "Rx - Hentai",
                      value: anime_search_query_rating.RX,
                    },
                  ]}
                  onChange={handleRatingChange}
                />
              </Box>
              <Box sx={{ m: 1, width: "20em" }}>
                <Typography id="non-linear-slider">
                  Score Range: {searchFilter.minScore ?? 0} -{" "}
                  {searchFilter.maxScore ?? 10}
                </Typography>
                <Slider
                  name="score"
                  min={0}
                  step={1}
                  max={10}
                  getAriaLabel={() => "Score range"}
                  value={[
                    searchFilter.minScore ?? 0,
                    searchFilter.maxScore ?? 10,
                  ]}
                  onChange={handleScoreChange}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Box sx={{ gap: ".5em" }} className="flex">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <FilterDatePicker
                    label="Start Date"
                    value={searchFilter.startDate}
                    onChange={(newStartDate) =>
                      setSearchFilter({
                        ...searchFilter,
                        startDate: newStartDate,
                      })
                    }
                  />
                  <FilterDatePicker
                    label="End Date"
                    value={searchFilter.endDate}
                    onChange={(newEndDate) =>
                      setSearchFilter({ ...searchFilter, endDate: newEndDate })
                    }
                  />
                </LocalizationProvider>
              </Box>
              <h2>Genre</h2>
              <Box sx={{ m: 1 }} className="grid-5">
                {animeGenresMap}
              </Box>
            </>
          )}
          <Box sx={{ gap: ".5em" }} className="flex">
            <a
              href={`${location.pathname}?${searchParams.toString()}`}
              className="button-style"
              onClick={handleSearch}
              onKeyDown={handleKeyPress}
            >
              Search
            </a>
            <p className="button-style secondary" onClick={clearFilter}>
              Clear
            </p>
          </Box>
        </Box>
        {searchAnimesResult !== undefined && (
          <AnimeTemplatePage
            currentPage={currentPage}
            isLastPage={isLastPage}
            title={"Advanced Search Result"}
            animesData={searchAnimes}
          />
        )}
      </div>
    </main>
  );
};

export default AnimeAdvancedSearchPage;
