import React, { Fragment, useState, useEffect } from 'react';

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
} from '@chakra-ui/react';

const Home = () => {
  const [orbit, setOrbit] = useState(1000);
  const [mass, setMass] = useState(0);
  const [inclination, setInclination] = useState(90);
  const [price, setPrice] = useState(0);
  const [priceFormatted, setPriceFormatted] = useState('0');

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
  }, [mass, orbit]);

  return (
    <Fragment>
      <Center w="100%" h="100vh" bg="black">
        <Box>
          <Flex mb="5">
            <FormControl mr="5">
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
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon children="km" />
              </InputGroup>
              <FormHelperText>Range: 300km - 2,000km</FormHelperText>
            </FormControl>

            <FormControl mr="5">
              <FormLabel>Expected Payload Mass</FormLabel>
              <InputGroup size="lg">
                <NumberInput
                  defaultValue={0}
                  min={0}
                  max={500}
                  onChange={valueString => {
                    if (valueString) {
                      setMass(parseInt(valueString));
                    } else {
                      setMass(0);
                    }
                  }}
                  value={`${mass}`}
                >
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon children="kg" />
              </InputGroup>
              <FormHelperText>Range: Up to 500kg</FormHelperText>
            </FormControl>

            <FormControl mr="5">
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
                  <NumberInputField />
                </NumberInput>
                <InputRightAddon children="°" />
              </InputGroup>
              <FormHelperText>Range: 0° - 180°</FormHelperText>
            </FormControl>
          </Flex>

          <Box>
            {/* <Heading as="h3" size="lg" style={{ fontFamily: 'Space Grotesk' }}>
              Expected Price: {formatter.format(price)}
            </Heading> */}
            <Heading as="h3" size="lg" style={{ fontFamily: 'Space Grotesk' }}>
              Expected Price: ${priceFormatted}
            </Heading>
          </Box>
        </Box>
      </Center>
    </Fragment>
  );
};

export default Home;
