import React, { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

// chakra
import {
  Box,
  Center,
  Button,
  ButtonGroup,
  Input,
  DarkMode,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  InputGroup,
  Stack,
  Checkbox,
  Select,
  Text,
} from '@chakra-ui/react';

const Home = () => {
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);

  const [orbit, setOrbit] = useState(1000);
  const [mass, setMass] = useState(0);
  const [inclination, setInclination] = useState(90);
  const [price, setPrice] = useState(0);
  const [priceFormatted, setPriceFormatted] = useState('0');
  const [cubicVolume, setCubicVolume] = useState('1');
  const [timeInOrbit, setTimeInOrbit] = useState('3m');

  const [isLastMile, setIsLastMile] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 992 });

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
  };

  useEffect(() => {
    if (isLastMile) {
      if (orbit >= 300 && orbit <= 550) {
        setPrice(mass * 12000);
        setPriceFormatted(nFormatter(mass * 12000, 1));
      } else if (orbit > 550) {
        let multiplier = ((15000 - 12000) / (2000 - 550)) * orbit + 10862.06897;
        setPrice(mass * multiplier);
        setPriceFormatted(nFormatter(mass * multiplier, 1));
      } else {
        setPrice(0);
      }
    } else {
      if (mass <= 2) {
        const cVol = 4500000 * parseFloat(cubicVolume);
        let tInOrbit = 0;
        if (timeInOrbit === '6m') {
          tInOrbit = 300000;
        } else if (timeInOrbit === '3m') {
          tInOrbit = 600000;
        }
        setPrice(2 * 1.5 * 22000 + cVol + tInOrbit);
        setPriceFormatted(nFormatter(2 * 1.5 * 22000 + cVol + tInOrbit, 1));
      } else {
        const cVol = 4500000 * parseFloat(cubicVolume);
        let tInOrbit = 0;
        if (timeInOrbit === '6m') {
          tInOrbit = 300000;
        } else if (timeInOrbit === '3m') {
          tInOrbit = 600000;
        }
        setPrice(mass * 1.5 * 22000 + cVol + tInOrbit);
        setPriceFormatted(nFormatter(mass * 1.5 * 22000 + cVol + tInOrbit, 1));
      }
    }
  }, [mass, orbit, cubicVolume, timeInOrbit, isLastMile]);

  useEffect(() => {
    setIsDesktopScreen(isDesktop);
  }, [isDesktop]);

  return (
    <Fragment>
      <Center w="100%" h="100vh" bg="#0C1321">
        <Box>
          <Stack
            direction={isDesktopScreen ? 'row' : 'column'}
            spacing={isDesktopScreen ? '10' : '4'}
          >
            <FormControl>
              <FormLabel>Expected Payload Mass</FormLabel>
              <InputGroup size="lg">
                <NumberInput
                  defaultValue={0}
                  min={0}
                  max={isLastMile ? 500 : 6}
                  onChange={valueString => {
                    if (valueString) {
                      setMass(parseInt(valueString));
                    } else {
                      setMass(0);
                    }
                  }}
                  value={`${mass}`}
                >
                  <NumberInputField
                    borderWidth="3px"
                    borderRadius="6px 0px 0px 6px"
                    borderColor="#333945"
                  />
                </NumberInput>
                <InputRightAddon children="kg" />
              </InputGroup>
              <FormHelperText>Range: Up to 500kg</FormHelperText>
            </FormControl>

            {isLastMile ? (
              <Fragment>
                <FormControl>
                  <FormLabel>Desired Orbit</FormLabel>
                  <InputGroup size="lg">
                    <NumberInput
                      min={300}
                      max={2000}
                      onChange={valueString => {
                        if (valueString) {
                          setOrbit(parseInt(valueString));
                        } else {
                          setOrbit(0);
                        }
                      }}
                      value={`${orbit}`}
                    >
                      <NumberInputField
                        borderWidth="3px"
                        borderRadius="6px 0px 0px 6px"
                        borderColor="#333945"
                      />
                    </NumberInput>
                    <InputRightAddon children="km" bg="#333945" />
                  </InputGroup>
                  <FormHelperText>Range: 300km - 2,000km</FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel>Inclination</FormLabel>
                  <InputGroup size="lg">
                    <NumberInput
                      defaultValue={90}
                      min={0}
                      max={180}
                      onChange={valueString => {
                        if (valueString) {
                          setInclination(parseInt(valueString));
                        } else {
                          setInclination(0);
                        }
                      }}
                      value={`${inclination}`}
                    >
                      <NumberInputField
                        borderWidth="3px"
                        borderRadius="6px 0px 0px 6px"
                        borderColor="#333945"
                      />
                    </NumberInput>
                    <InputRightAddon children="°" bg="#333945" />
                  </InputGroup>
                  <FormHelperText>Range: 0° - 180°</FormHelperText>
                </FormControl>
              </Fragment>
            ) : (
              <Fragment>
                <FormControl>
                  <FormLabel>Cubic Volume</FormLabel>
                  <InputGroup size="lg">
                    <Select
                      size="lg"
                      borderWidth="3px"
                      borderRadius="6px 0px 0px 6px"
                      borderColor={'#333945'}
                      value={cubicVolume}
                      onChange={e => {
                        setCubicVolume(e.target.value);
                      }}
                    >
                      <option value="1">1</option>
                      <option value=".5">.5</option>
                      <option value=".25">.25</option>
                    </Select>
                    <InputRightAddon
                      children={
                        <Text>
                          m<sup>3</sup>
                        </Text>
                      }
                    />
                  </InputGroup>
                </FormControl>

                {/* $4.5 milliom */}

                <FormControl>
                  <FormLabel>Time in Orbit</FormLabel>
                  <Select
                    size="lg"
                    borderWidth="3px"
                    borderColor={'#333945'}
                    defaultValue="3m"
                    value={timeInOrbit}
                    onChange={e => {
                      setTimeInOrbit(e.target.value);
                    }}
                  >
                    <option value="3m">3 months</option>
                    {/* + 600K milliom */}
                    <option value="6m">6 months</option>
                    {/* + 300K milliom */}
                    <option value="1y">1 year</option>
                  </Select>
                </FormControl>
              </Fragment>
            )}
          </Stack>

          <Flex mt="4" mb="5">
            {/* <Checkbox
              size="lg"
              colorScheme="blue"
              isChecked={isReentry}
              onChange={e => {
                setIsReentry(e.target.checked);
              }}
            >
              Re-entry Payload
            </Checkbox> */}
            <Checkbox
              size="lg"
              colorScheme="blue"
              isChecked={isLastMile}
              onChange={e => {
                setIsLastMile(e.target.checked);
              }}
            >
              Last Mile Delivery
            </Checkbox>
          </Flex>

          <Box>
            <Heading as="h3" size="lg" style={{ fontFamily: 'Space Grotesk' }}>
              Estimated Price: ${priceFormatted}
            </Heading>
          </Box>
        </Box>
      </Center>
    </Fragment>
  );
};

export default Home;
