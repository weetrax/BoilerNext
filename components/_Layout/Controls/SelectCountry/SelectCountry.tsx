import countriesJson from "../../../../constants/countries.json";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select, { GroupBase, StylesConfig } from "react-select";
import { SelectCountryOption } from "../../../../types";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

interface SelectCountryProps extends StateManagerProps {
  selectedCountry?: SelectCountryOption;
  setSelectedCountry?: (value: SelectCountryOption | undefined) => void;
}

const selectStyles:
  | StylesConfig<unknown, boolean, GroupBase<unknown>>
  | undefined = {
  input: (base) => ({
    ...base,
    color: "black",
  }),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    padding: "0.125rem 1rem",
    borderRadius: "0.75rem",
    color: "black",
    borderColor: "rgb(212 212 212)",
    "&:hover": {
      borderColor: "#fca311",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "black",
  }),
  placeholder: (base) => ({
    ...base,
    color: "black",
  }),
  menu: (base) => ({
    ...base,
    zIndex: "100",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    background: isFocused ? "#fca311" : isSelected ? "#fca311" : undefined,
    zIndex: 1,
    color: "black",
    "&:hover": {
      background: "#fdc870",
    },
  }),
};

const SelectCountry: React.FC<SelectCountryProps> = ({
  selectedCountry,
  setSelectedCountry,
  ...props
}) => {
  const [options, setOptions] = useState<SelectCountryOption[]>([]);
  useEffect(() => {
    let _options: SelectCountryOption[] = [];
    countriesJson.forEach((c) => {
      _options = [
        ..._options,
        { label: c.name, value: c.code, plainObject: c },
      ];
    });
    setOptions(_options);
  }, []);

  return (
    <Select
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      noOptionsMessage={() => <>Aucun pays trouvé</>}
      loadingMessage={() => <>Chargement des pays...</>}
      placeholder="Choisir un pays"
      options={options}
      isClearable
      {...props}
    />
  );
};

SelectCountry.propTypes = {
  //
};

export default SelectCountry;
