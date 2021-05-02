/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

function Answers({ onChange, control }) {
  return (
    <Controller
      as={(
        <Autocomplete
          id="country-select-demo"
          style={{ width: 300 }}
          options={countries}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <>
              {option.label}
              {" "}
              (
              {option.code}
              ) +
              {option.phone}
            </>
          )}
          renderInput={(params) => (
            <input
              {...params}
              label="Choose a country"
              variant="outlined"
              fullWidth
            />
            // <TextField
            // {...params}
            //   label="Choose a country"
            //   variant="outlined"
            //   fullWidth
            //   inputProps={{
            //     ...params.inputProps,
            //     autoComplete: "disabled",
            //   }}
            // />
          )}
        />
      )}
      onChange={([event, data]) => data || { label: "" }}
      name="country"
      control={control}
      defaultValue={{ code: "AF", label: "Afghanistan", phone: "93" }}
    />
  );
}

export const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AE", label: "United Arab Emirates", phone: "971" },
  { code: "AF", label: "Afghanistan", phone: "93" },
];

export default Answers;
