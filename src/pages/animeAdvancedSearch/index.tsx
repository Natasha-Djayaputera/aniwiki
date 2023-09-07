import {
  Box,
  FormControl,
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
import { useSearchParams } from "react-router-dom";
import AnimeTemplatePage from "../../components/AnimeTemplatePage";
import {
  anime_search_query_rating,
  anime_search_query_status,
  anime_search_query_type,
} from "../../generated/jikan";
import { anime_search_param } from "../../generated/jikan/models/anime_search";
import { useAdvancedAnimeSearch } from "../../hooks/useAdvancedAnimeSearch";

const AnimeAdvancedSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const removeUndefinedValue = (obj: Object) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== undefined && value !== "undefined"
      )
    );
  };
  const [searchFilter, setSearchFilter] = useState<anime_search_param>(
    removeUndefinedValue({
      q: searchParams.get("q") ?? undefined,
      type: (searchParams.get("type") as anime_search_query_type) ?? undefined,
      minScore: Number(searchParams.get("minScore") ?? 0) ?? undefined,
      maxScore: Number(searchParams.get("maxScore") ?? 10) ?? undefined,
      status:
        (searchParams.get("status") as anime_search_query_status) ?? undefined,
      rating:
        (searchParams.get("rating") as anime_search_query_rating) ?? undefined,
      startDate: searchParams.get("startDate") ?? undefined,
      endDate: searchParams.get("endDate") ?? undefined,
    })
  );
  console.log(searchFilter);
  const searchAnimesResult = useAdvancedAnimeSearch(searchFilter);

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
      .map(([key, value]) => ({
        [key]: String(value),
      }))
      .reduce((result, currentObject) => {
        return { ...result, ...currentObject };
      }, {});
    setSearchParams(newParams);
  };

  const clearFilter = () => {
    setSearchFilter({});
  };

  return (
    <main>
      <div className="content">
        <h1>Filter</h1>
        <div className="filter">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filter-title"
              label="Title"
              variant="outlined"
              value={searchFilter.q || ""}
              onChange={handleTitleChange}
            />
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="filter-type-label">Type</InputLabel>
            <Select
              labelId="filter-type-select-label"
              id="filter-type-select"
              value={searchFilter.type || ""}
              label="Type"
              onChange={handleTypeChange}
            >
              <MenuItem value={undefined}>None</MenuItem>
              <MenuItem value={anime_search_query_type.MOVIE}>Movie</MenuItem>
              <MenuItem value={anime_search_query_type.MUSIC}>Music</MenuItem>
              <MenuItem value={anime_search_query_type.ONA}>ONA</MenuItem>
              <MenuItem value={anime_search_query_type.OVA}>OVA</MenuItem>
              <MenuItem value={anime_search_query_type.SPECIAL}>
                Special
              </MenuItem>
              <MenuItem value={anime_search_query_type.TV}>TV</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ m: 1, width: "25ch" }}>
            <Typography id="non-linear-slider">
              Score Range: {searchFilter.minScore ?? 0} -{" "}
              {searchFilter.maxScore ?? 10}
            </Typography>
            <Slider
              min={0}
              step={1}
              max={10}
              getAriaLabel={() => "Score range"}
              value={[searchFilter.minScore ?? 0, searchFilter.maxScore ?? 10]}
              onChange={handleScoreChange}
              valueLabelDisplay="auto"
            />
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          <FormControl sx={{ m: 1, minWidth: 120 }}>
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
          <Box sx={{ m: 1 }}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
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
        </div>
        <a
          href={`/anime/search/advanced?${searchParams.toString()}`}
          className="button-style"
          onClick={handleSearch}
        >
          Search
        </a>
        <p className="button-style" onClick={clearFilter}>
          Clear
        </p>
        <AnimeTemplatePage
          currentPage={currentPage}
          isLastPage={isLastPage}
          title={"Advanced Search Result"}
          animesData={searchAnimes}
        />
      </div>
    </main>
  );
};

export default AnimeAdvancedSearchPage;
