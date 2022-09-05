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

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    if (orbit == 300) {
      setPrice(mass * 12000);
    } else {
      setPrice(mass * 15000);
    }
  }, [mass, orbit]);

  return (
    <Fragment>
      <Center w="100%" h="100vh" bg="grey.100">
        <Box>
          <Flex mb="5">
            <FormControl mr="5">
              <FormLabel>Desired Orbit</FormLabel>
              <InputGroup size="lg">
                <NumberInput
                  min={300}
                  max={2000}
                  onChange={valueString => setOrbit(parseInt(valueString))}
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
                  onChange={valueString => setMass(parseInt(valueString))}
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
                  onChange={valueString =>
                    setInclination(parseInt(valueString))
                  }
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
            <Heading as="h3" size="lg" style={{ fontFamily: 'Space Grotesk' }}>
              Expected Price: {formatter.format(price)}
            </Heading>
          </Box>
        </Box>
      </Center>
    </Fragment>
  );
};

export default Home;
