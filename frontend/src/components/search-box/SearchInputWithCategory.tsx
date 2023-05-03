import Link from "next/link";
import {
  ChangeEvent,
  FC,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Box, MenuItem, Button, TextField, styled, useTheme } from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import TouchRipple from "@mui/material/ButtonBase";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";


const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: { display: "none" },
}));

const SearchInputWithCategory: FC = () => {
  const parentRef = useRef();
  const { breakpoints } = useTheme();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState("*");
  const [resultList, setResultList] = useState<string[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("仕事種類");

  // HANDLE CHANGE THE CATEGORY
  const handleCategoryChange =
    (cat: { title: string; value: string }) => () => {
      setCategory(cat.value);
      setCategoryTitle(cat.title);
    };

  // FETCH PRODUCTS VIA API
  const getProducts = async (searchText: string, category?: string) => {
    // const data = await api.searchProducts(searchText, category);
    // setResultList(data);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      const value = e.target?.value;

      if (!value) setResultList([]);
      else if (value && category !== "*") getProducts(value, category);
      else getProducts(value);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);

  // CATEGORY MENU DROPDOWN
  const categoryDropdown = (
    <BazaarMenu
      direction="left"
      sx={{ zIndex: breakpoints.down("md") ? 99999 : 1502 }}
      handler={
        <DropDownHandler
          px={3}
          gap={0.5}
          height="100%"
          color="grey.700"
          bgcolor="grey.100"
          alignItems="center"
          component={TouchRipple}
        >
          {categoryTitle}
          <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
        </DropDownHandler>


      }
    >
      {categories.map((item) => (
        <MenuItem key={item.value} onClick={handleCategoryChange(item)}>
          {item.title}
        </MenuItem>
      ))}
    </BazaarMenu>
  );

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="仕事を探す"
        onChange={handleSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: <>{categoryDropdown}<Button
            color="primary"
            disableElevation
            variant="contained"
            sx={{
              px: "3rem",
              height: "100%",
              borderRadius: "0 300px 300px 0",
            }}
          >
            Search
          </Button></>,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>{item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

const categories = [
  { title: "仕事種類", value: "*" },
  { title: "業務委託", value: "1" },
  { title: "正社員", value: "2" },
  { title: "契約社員", value: "3" },
  { title: "副業", value: "4" },
  { title: "アルバイト", value: "5" },
];

export default SearchInputWithCategory;
