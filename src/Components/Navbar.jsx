import { CgProfile } from "react-icons/cg";
import { BsHandbag } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";
import { SearchIcon } from "@chakra-ui/icons";
import CWLOGO from "../assets/CWLOGO-1.png";
import { auth } from "./firebase";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  Image,
  VStack,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Tag,
  Menu,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuButton,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../Redux/Cart/Cart.action";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const { cartData } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [lgUser, setLgUser] = useState({});

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  let User = JSON.parse(localStorage.getItem("USER")) || {};
  let booleanValue = Boolean(User.isAuth);

  //console.log(User);

  useEffect(() => {
    auth.onAuthStateChanged((user, email) => {
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        // console.log(user.displayName)
      } else {
        setUserName("");
        setUserEmail("");
      }
    });
  }, []);
  const handleLogout = () => {
    setLgUser({ ...User, isAuth: false });
    booleanValue = Boolean(lgUser.isAuth);
    localStorage.setItem("USER", JSON.stringify(lgUser));
  };
  return (
    <Box w={"100%"} border={"1px solid black"}>
      <Flex
        w={"100%"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        zIndex={999}
        pos={"fixed"}
        top={0}
        columnGap={10}
        justifyContent={'space-evenly'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        alignItems={"center"}
        border={"4px solid green"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          border={'1px solid green'}
          
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" ,lg:'start'}}
          w={"50%"}
          border={'1px solid grey'}
        >
          <NavLink to="/">
            <Box width={'25%'}  border={"1px solid black"} >
              <Image
                src={CWLOGO}
               w={'100%'}
              />
            </Box>
          </NavLink>
          
          <Flex display={{ base: "none", md: "flex" }} border={'1px solid black'} w={'75%'} alignItems={"center"}>
            <NavLink to="/Product" >
              <DesktopNav />
            </NavLink>
          </Flex>
        </Flex>

        <Stack
          w={{ base: "none", sm: "none", md: "none", lg: "30%" }}
          //mr={"5%"}
          border={'1px solid blue'}
        >
          <InputGroup
            display={{ base: "none", sm: "none", md: "none", lg: "block" }}
            w={'100%'}
          >
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search for produts,brands and more"
            />
          </InputGroup>
        </Stack>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          // mr={"2%"}
          width={'15%'}
          border={'1px solid red'}
        >
          <VStack spacing={1}>
            <CgProfile />

            <Menu>
              <MenuButton>
                <Button
                  as={"a"}
                  fontSize={"sm"}
                  fontWeight={"700"}
                  variant={"link"}
                >
                  Profile
                </Button>
              </MenuButton>
              <MenuList ml={"50%"}>
                <MenuGroup>
                  <Flex
                    direction={"column"}
                    align={"flex-start"}
                    padding={"10px"}
                  >
                    <Text fontWeight={"bold"} fontSize={"15px"}>
                      {booleanValue ? userName : "Welcome"}
                      {/* {userName} */}
                    </Text>

                    <Text fontSize={"12px"} fontWeight={"500"}>
                      {Boolean(booleanValue)
                        ? userEmail
                        : " To access account and orders"}
                      {/* {userEmail} */}
                    </Text>

                    <Button
                      mt={"10px"}
                      variant="outline"
                      fontSize={"13px"}
                      fontWeight={"bold"}
                      color="#FF3F6C"
                      isDisabled={booleanValue}
                    >
                      <NavLink to="/Login">LOGIN </NavLink>/{" "}
                      <NavLink to="/Register">SIGNUP</NavLink>
                    </Button>
                  </Flex>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <Flex
                    direction={"column"}
                    gap={"5px"}
                    align={"flex-start"}
                    padding={"10px"}
                    fontWeight={"500"}
                    fontSize={"13px"}
                  >
                    <NavLink to="/Wishlist">
                      <Link>Orders</Link>
                      <Link>Wishlist</Link>
                    </NavLink>
                    <Link>Gift Cards</Link>
                    <Link>Contact Us</Link>
                    <Stack direction={"row"} align={"center"} spacing={1}>
                      <Link>Myntra Insider</Link>
                      <Tag
                        size={"sm"}
                        bg={useColorModeValue("pink.400", "green.800")}
                        ml={2}
                        color={"white"}
                      >
                        New
                      </Tag>
                    </Stack>
                  </Flex>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <Flex
                    direction={"column"}
                    gap={"5px"}
                    align={"flex-start"}
                    padding={"10px"}
                    fontWeight={"500"}
                    fontSize={"13px"}
                  >
                    <Link>Myntra Credit</Link>
                    <Link>Coupons</Link>
                    <Link>Saved Cards</Link>
                    <Link>Saved VPA</Link>
                    <NavLink to="/Address">
                      <Link>Addresses</Link>
                    </NavLink>
                  </Flex>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <Flex
                    direction={"column"}
                    gap={"5px"}
                    align={"flex-start"}
                    padding={"10px"}
                    fontWeight={"500"}
                    fontSize={"13px"}
                  >
                    <Button
                      variant="outline"
                      //isDisabled={!booleanValue}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Flex>
                </MenuGroup>
              </MenuList>
            </Menu>
          </VStack>
          <NavLink to="/Wishlist">
            <VStack spacing={2}>
              <BsSuitHeart />
              <Button
                as={"a"}
                fontSize={"xs"}
                fontWeight={700}
                variant={"link"}
                href={"#"}
              >
                Wishlist
              </Button>
            </VStack>
          </NavLink>
          <NavLink to="/Cart">
            <HStack spacing={-1} alignItems={"flex-start"}>
              <VStack spacing={2}>
                <BsHandbag />
                <Button
                  as={"a"}
                  fontSize={"xs"}
                  fontWeight={700}
                  variant={"link"}
                  href={"#"}
                >
                  Bag
                </Button>
              </VStack>
              <Text
                bg={"pink.500"}
                color={"white"}
                paddingX={2}
                borderRadius={"50%"}
              >
                {cartData.length}
              </Text>
            </HStack>
          </NavLink>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("grey.600", "gray.200");
  const linkHoverColor = useColorModeValue("pink.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack
      direction={"row"}
      spacing={4}
      w={"100%"}
      alignItems={"center"}
      border={"1px solid red"}
      display={'flex'}
      justifyContent={'space-between'}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} border={"1px solid blue"}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                  borderBottom: "3px solid red",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"lg"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"4xl"}
              >
                <Flex
                  direction={"row"}
                  width={"full"}
                  gap={"20px"}
                  justifyContent={"space-between"}
                >
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Flex>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack
        direction={"column"}
        align={"flex-start"}
        spacing={0}
        border={"0px solid pink"}
      >
        <Flex direction={"column"} align={"flex-start"}>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={700}
            fontSize={"xs"}
            color={"#D53F8C"}
          >
            {label}
          </Text>
        </Flex>
        <Flex direction={"column"} align={"flex-start"} gap={"5px"}>
          {subLabel.map((el, i) => (
            <Text fontSize={"sm"} key={i}>
              {el}
            </Text>
          ))}
        </Flex>

        <Flex
          transition={"all .3s ease"}
          direction={"column"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <VStack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </VStack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "MENS",
    children: [
      {
        label: "Topwear",
        subLabel: [
          "T-Shirts",
          "Casual Shirts",
          "Formal Shirts",
          "Sweatshirts",
          "Sweaters",
          "Jackets",
          "Blazzers and Coats",
          "Suits",
          "Rain Jackets",
        ],
        href: "#",
      },
      {
        label: "Indian and Festive Wear",
        subLabel: [
          "Kurtas and Kurtas Sets",
          "Sherwanies",
          "Nehru Jacket",
          "Dhoties",
        ],
        href: "#",
      },
      {
        label: "Bottomwear",
        subLabel: [
          "Jeans",
          "Casual Trousers",
          "Shorts",
          "TrackPants and Joggers",
        ],
        href: "#",
      },
      {
        label: "Innerwear ans Sleepwear",
        subLabel: [
          "Brief and Trunks",
          "Vests",
          "Sleepwear and Loungewear",
          "Thermals",
        ],
        href: "#",
      },

      {
        label: "Footwear",
        subLabel: [
          "Casual Shoes",
          "Sports Shoes",
          "Formal Shoes",
          "Sneakers",
          "Sandals and Floaters",
          "Flip Flops",
          "Socks",
        ],
        href: "#",
      },
    ],
  },
  {
    label: "WOMEN",
    children: [
      {
        label: "Indian and Fusion Wear",
        subLabel: [
          "Crop tops Lehenga",
          "Palazzo Lehenga",
          "jacket over Sari",
          "Pants under Saree",
          "Slit Dhoti under Blouse",
          "Ethnic saree",
          "Ethnic skirt",
        ],
        href: "#",
      },
      {
        label: "Western Wear",
        subLabel: [
          "Dresses",
          "Tops",
          "TShirts",
          "Jeans",
          "Trousers & Capris",
          "Shorts and Skirts",
          "Co-ords",
          "Playsuits",
          "Jumpsuits",
          "Shrungs",
          "Sweaters & SweatShirts",
          "Blazzers and Waistcoats",
        ],
        href: "#",
      },
      {
        label: "Footwear",
        subLabel: [
          "Flats",
          "Casual Shoes",
          "Heels",
          "Boots",
          "Sports Shoes & Floaters",
          "Sports and Active Wear",
        ],
        href: "#",
      },
      {
        label: "Lingerie & Sleepwear",
        subLabel: [
          "Acne & Blemishes",
          "Fine Lines & Wrinkles",
          "Dark Circles",
          "Dry Skin",
          "Dullness",
          "Lack of Fairness",
          "Pigmentaion",
        ],
        href: "#",
      },
      {
        label: "Beauty & Personal Care",
        subLabel: [
          "Take The SPF Quiz",
          "SPF 30 and over",
          "SPF 50 and over",
          "After Sun",
          "Tinted",
          "Mineral",
          "Eye Protection",
        ],
        href: "#",
      },
    ],
  },
  {
    label: "KIDS",
    children: [
      {
        label: "Boys Clothing",
        subLabel: [
          "T-Shirts",
          "Casual Shirts",
          "Formal Shirts",
          "Sweatshirts",
          "Sweaters",
          "Jackets",
          "Blazzers and Coats",
          "Suits",
          "Rain Jackets",
        ],
        href: "#",
      },
      {
        label: "Girls Clothing",
        subLabel: [
          "Shampoo",
          "Conditioners",
          "Hair Treatments",
          "Hair Masks",
          "Hair Oils",
          "Hair Sprays",
          "Hair Styling",
          "Hair Thinning & Loss",
        ],
        href: "#",
      },
      {
        label: "Footwear",
        subLabel: [
          "Flats",
          "Casual Shoes",
          "Heels",
          "Boots",
          "Sports Shoes & Floaters",
          "Sports and Active Wear",
        ],
        href: "#",
      },
      {
        label: "Toys",
        subLabel: ["Flat Irons", "Hair Dryers", "Rollers & Curling Tongs"],
        href: "#",
      },
      {
        label: "Infants",
        subLabel: [" Removal Devices", " Removal Products", " Beauty Products"],
        href: "#",
      },
    ],
  },
  {
    label: "HOME & LIVING",
    children: [
      {
        label: "Ben Linen & Furnishing",
        subLabel: [
          "New In",
          "Clean Makeup",
          "5 Rated Products",
          "Gifts & Sets",
          "Brushes & Applicators",
          "Makeup Palettes",
          "Nails",
        ],
        href: "#",
      },
      {
        label: "Flooring",
        subLabel: [
          "Eye Liners",
          "Lash & Brow Enhancers",
          "Eye Shadows",
          "Mascaras",
          "Brow Pencils",
        ],
        href: "#",
      },
      {
        label: "Bath",
        subLabel: [
          "BB && CC Cream",
          "Blushers",
          "Bronzers",
          "Color Correctors",
          "Concealers",
          "Contour",
          "Face Powders",
          "Foundations",
          "Highlighters",
        ],
        href: "#",
      },
      {
        label: "Lamps and Lighting",
        subLabel: [
          "stastics",
          "Lamps Balms",
          "Lamp Glosses",
          " Liners",
          " Plumpers",
          "Liquid Lamps",
        ],
        href: "#",
      },
      {
        label: "Home Decor",
        subLabel: [
          "Accessories",
          "Pre-Tan Preparation",
          "Body Tanners",
          "Post Tanning",
        ],
        href: "#",
      },
    ],
  },
  {
    label: "BEAUTY",
    children: [
      {
        label: "Makeup",
        subLabel: [
          "View All Bath & Body",
          "New In",
          "Clean Bath & Body",
          "5 Rated Products",
          "Gifts & Sets",
          "Travel Sizes",
          "At Home Spa",
          "Decorants",
          "Oral Care",
        ],
        href: "#",
      },
      {
        label: "Skincare,Bath & Body",
        subLabel: [
          "Baths Oils/Soak",
          "Bath Salts",
          "Body Washes",
          "Cleansing bars",
          "Exfoliators",
        ],
        href: "#",
      },
      {
        label: "Baby Care",
        subLabel: [
          "Accessories",
          "Pre-Tan Preparation",
          "Body Tanners",
          "Post Tanning",
        ],
        href: "#",
      },
      {
        label: "Moisturizers",
        subLabel: ["Balms", "Butters", "Creams", "Lotions", "Oils"],
        href: "#",
      },
      {
        label: "Haircare",
        subLabel: [
          "Bust",
          "Cellulite",
          "Dry Skin",
          "Hair Removal",
          "Hands & Foot Care",
          "Hans Soap Senitizers & Creams",
          "Legs",
          "Simming & Sculpting",
          "Strecth Marks",
          "Sunscreen",
        ],
        href: "#",
      },
    ],
  },
  {
    label: "STUDIO",
    children: [
      {
        label: "Galary",
        subLabel: ["View All Fragrance", "New In", "5 Rated Products"],
        href: "#",
      },
      {
        label: "Top Brands",
        subLabel: [
          "NEOM Organics",
          "Glasshouse Fragrances",
          "KORRES",
          "NEST Fragrance",
          "Molton Brown",
        ],
        href: "#",
      },
      {
        label: "Deoderants",
        subLabel: [
          "Perfume",
          "EAU de Toilette",
          "Body Spray",
          "For Her",
          "For Him",
        ],
        href: "#",
      },
      {
        label: "Ethnic",
        subLabel: [
          "Scented Candles",
          "Diffusers",
          "Aromatherapy",
          "Pillow Mists",
          "Room Sprays",
        ],
        href: "#",
      },

      {
        label: "Upcoming Fashion",
        subLabel: ["In Shirts", "In Pants", "Casual", "Watches", "Footwear"],
        href: "#",
      },
    ],
  },
];
