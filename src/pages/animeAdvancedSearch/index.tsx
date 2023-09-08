import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import ShowMore from "../../components/ShowMore";
import {
  anime_search_query_rating,
  anime_search_query_status,
  anime_search_query_type,
} from "../../generated/jikan";
import { anime_search_param } from "../../generated/jikan/models/anime_search";
import { useAdvancedAnimeSearch } from "../../hooks/useAdvancedAnimeSearch";
import { useAnimeGenres } from "../../hooks/useAnimeGenres";

const AnimeAdvancedSearchPage: React.FC = () => {
  const [isAdvancedFilter, setIsAdvancedFilter] = useState<boolean>(false);

  const toggleAdvancedFilter = () => {
    setIsAdvancedFilter(!isAdvancedFilter);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const removeUndefinedValue = (obj: Object) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) =>
          value !== undefined && value !== "undefined" && !Number.isNaN(value)
      )
    );
  };
  const [searchFilter, setSearchFilter] = useState<anime_search_param>(
    removeUndefinedValue({
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
  const searchAnimesResult = useAdvancedAnimeSearch(searchFilter);
  const animeGenresResult = useAnimeGenres();

  const sortedAnimeGenres = animeGenresResult?.sort((a, b) => {
    return a.name?.toString().localeCompare(b.name ?? "") ?? 0;
  });

  const searchAnimes = searchAnimesResult?.data;
  const isLastPage = !searchAnimesResult?.pagination?.has_next_page;
  const currentPage = searchAnimesResult?.pagination?.current_page;

  const handleTypeChange = (event: SelectChangeEvent) => {
    const selectedType = event.target.value as anime_search_query_type; // Cast the value to the correct type
    setSearchFilter({ ...searchFilter, type: selectedType });
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    const selectedStatus = event.target.value as anime_search_query_status; // Cast the value to the correct type
    setSearchFilter({ ...searchFilter, status: selectedStatus });
  };

  const handleRatingChange = (event: SelectChangeEvent) => {
    const selectedRating = event.target.value as anime_search_query_rating; // Cast the value to the correct type
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
    const filteredSearchFilter = removeUndefinedValue(searchFilter);
    const newParams = Object.entries(filteredSearchFilter)
      .map(([key, value]) => {
        return { [key]: String(value) };
      })
      .reduce((result, currentObject) => {
        return { ...result, ...currentObject };
      }, {});
    setSearchParams(newParams);
  };

  const clearFilter = () => {
    setSearchFilter({});
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Listen for Enter key press
      handleSearch();
      window.location.href = `${location.pathname}?${searchParams.toString()}`;
    }
  };

  const animeGenresMap = sortedAnimeGenres
    ?.slice(0, !isAdvancedFilter ? 10 : -1)
    .map((genre) => {
      const handleGenreChange = () => {
        const genresArray = searchFilter.genres?.split(",") ?? [];
        const index = genresArray.indexOf(String(genre.mal_id));
        const newGenres = genresArray.includes(String(genre.mal_id))
          ? genresArray.filter((_, i) => i !== index)
          : [...genresArray, String(genre.mal_id)];
        setSearchFilter({ ...searchFilter, genres: newGenres.toString() });
      };
      const genresArray = searchFilter.genres?.split(",") ?? [];

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
        <h1>Filter</h1>
        <div className="filter">
          <ShowMore
            showMoreAltText="Show Advanced Filter"
            showLessAltText="Hide Advanced Filter"
            isShowMore={isAdvancedFilter}
            toggleShowMore={toggleAdvancedFilter}
          />
          <Box
            component="div"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "99%" },
            }}
          >
            <TextField
              id="filter-title"
              name="q"
              label="Title"
              variant="outlined"
              value={searchFilter.q || ""}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
            />
          </Box>
          {isAdvancedFilter && (
            <div>
              <Box sx={{ m: 1, gap: ".5em" }} className="flex">
                <FormControl sx={{ width: "10em" }}>
                  <InputLabel id="filter-type-label">Type</InputLabel>
                  <Select
                    labelId="filter-type-select-label"
                    id="filter-type-select"
                    value={searchFilter.type || ""}
                    label="Type"
                    onChange={handleTypeChange}
                  >
                    <MenuItem value={undefined}>None</MenuItem>
                    <MenuItem value={anime_search_query_type.MOVIE}>
                      Movie
                    </MenuItem>
                    <MenuItem value={anime_search_query_type.MUSIC}>
                      Music
                    </MenuItem>
                    <MenuItem value={anime_search_query_type.ONA}>ONA</MenuItem>
                    <MenuItem value={anime_search_query_type.OVA}>OVA</MenuItem>
                    <MenuItem value={anime_search_query_type.SPECIAL}>
                      Special
                    </MenuItem>
                    <MenuItem value={anime_search_query_type.TV}>TV</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "10em" }}>
                  <InputLabel id="filter-status-label">Status</InputLabel>
                  <Select
                    labelId="filter-status-select-label"
                    id="filter-status-select"
                    value={searchFilter.status || ""}
                    label="Status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value={undefined}>None</MenuItem>
                    <MenuItem value={anime_search_query_status.AIRING}>
                      Airing
                    </MenuItem>
                    <MenuItem value={anime_search_query_status.COMPLETE}>
                      Completed
                    </MenuItem>
                    <MenuItem value={anime_search_query_status.UPCOMING}>
                      Upcoming
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "10em" }}>
                  <InputLabel id="filter-rating-label">Rating</InputLabel>
                  <Select
                    labelId="filter-rating-select-label"
                    id="filter-rating-select"
                    value={searchFilter.rating || ""}
                    label="Rating"
                    onChange={handleRatingChange}
                  >
                    <MenuItem value={undefined}>None</MenuItem>
                    <MenuItem value={anime_search_query_rating.G}>
                      G - All Ages
                    </MenuItem>
                    <MenuItem value={anime_search_query_rating.PG}>
                      PG - Children
                    </MenuItem>
                    <MenuItem value={anime_search_query_rating.PG13}>
                      PG-13 - Teens 13 or older
                    </MenuItem>
                    <MenuItem value={anime_search_query_rating.R17}>
                      R - 17+ (violence & profanity)
                    </MenuItem>
                    <MenuItem value={anime_search_query_rating.R}>
                      R+ - Mild Nudity
                    </MenuItem>
                    <MenuItem value={anime_search_query_rating.RX}>
                      Rx - Hentai
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ m: 2, width: "20em" }}>
                <Typography id="non-linear-slider">
                  Score Range: {searchFilter.minScore ?? 0} -{" "}
                  {searchFilter.maxScore ?? 10}
                </Typography>
                <Slider
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
              <Box sx={{ m: 1, gap: ".5em" }} className="flex">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    sx={{ width: "15em" }}
                    label="Start Date"
                    value={
                      searchFilter.startDate === undefined
                        ? null
                        : moment(searchFilter.startDate, "YYYY-MM-DD")
                    }
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        helperText: "DD/MM/YYYY",
                      },
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    onChange={(newValue: Moment | null) =>
                      setSearchFilter({
                        ...searchFilter,
                        startDate:
                          newValue === null
                            ? undefined
                            : newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                  <DatePicker
                    sx={{ width: "15em" }}
                    label="End Date"
                    value={
                      searchFilter.endDate === undefined
                        ? null
                        : moment(searchFilter.endDate, "YYYY-MM-DD")
                    }
                    format="DD/MM/YYYY"
                    slotProps={{
                      textField: {
                        helperText: "DD/MM/YYYY",
                      },
                      actionBar: {
                        actions: ["clear"],
                      },
                    }}
                    onChange={(newValue: Moment | null) =>
                      setSearchFilter({
                        ...searchFilter,
                        endDate:
                          newValue === null
                            ? undefined
                            : newValue.format("YYYY-MM-DD"),
                      })
                    }
                  />
                </LocalizationProvider>
              </Box>
              <h2>Genre</h2>
              <Box sx={{ m: 1 }} className="grid-5">
                {animeGenresMap}
              </Box>
            </div>
          )}
        </div>
        <Box sx={{ m: 1, gap: ".5em" }} className="flex">
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
        {searchParams.size !== 0 && (
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
