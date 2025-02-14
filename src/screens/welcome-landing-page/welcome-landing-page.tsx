"use client";

import {
  Accordion,
  BackgroundImage,
  Burger,
  Container,
  Drawer,
  Flex,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useGetTariffs } from "@/entities/tariff";
import { fromDecimal } from "@/shared/lib";
import { ROUTES } from "@/shared/router";
import { Button } from "@/shared/ui/button";
import { FloatingIndicator } from "@/shared/ui/floating-indicator";

type WelcomeLandingPageProps = {
  className?: string;
};

export const WelcomeLandingPage: FC<WelcomeLandingPageProps> = ({
  className,
}) => {
  const [opened, handlers] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isPhone = useMediaQuery("(max-width: 639px)");

  const tariffsQuery = useGetTariffs({ filter: { isHidden: false } });

  return (
    <>
      <div className={clsx("", className)}>
        <BackgroundImage
          src={isPhone ? "/landing-bg-phone.webp" : "/landing-bg.webp"}
          className="min-h-[895px] text-white"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <header className="sm:mb-[400px] mb-[102.5px]">
              <Container className="py-6" size="xl">
                <div className="flex items-center">
                  <div className="flex items-center gap-x-4">
                    <Image src="/logo.svg" width={163} height={38} alt="logo" />
                    {!isMobile && (
                      <nav className="flex gap-x-1">
                        <Link href="#our-solution">
                          <UnstyledButton className="px-3.5 py-2 font-semibold">
                            Our Solution
                          </UnstyledButton>
                        </Link>
                        <Link href="#pricing">
                          <UnstyledButton className="px-3.5 py-2 font-semibold">
                            Pricing
                          </UnstyledButton>
                        </Link>
                        <Link href="#company">
                          <UnstyledButton className="px-3.5 py-2 font-semibold">
                            Company
                          </UnstyledButton>
                        </Link>
                      </nav>
                    )}
                  </div>

                  {isMobile ? (
                    <Burger
                      className="ml-auto text-white"
                      color="white"
                      onClick={handlers.toggle}
                    />
                  ) : (
                    <div className="flex items-center ml-auto gap-x-1">
                      <UnstyledButton className="px-3.5 py-2 font-semibold">
                        Contact Sales
                      </UnstyledButton>
                      <Link href={ROUTES.LOGIN}>
                        <UnstyledButton className="px-3 py-2 font-semibold">
                          Login
                        </UnstyledButton>
                      </Link>
                      <Link href={ROUTES.REGISTER}>
                        <Button
                          className="bg-custom-gradient border-0 ml-3"
                          size="md"
                        >
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Container>
            </header>
            <Container size="xl">
              <div className="max-w-[820px]">
                <Title
                  className="lg:text-h1 lg:leading-h1 lg:mb-5 mb-12"
                  size="h0"
                >
                  Play Smarter <br /> with AI Precision
                </Title>
                <Text
                  size="xl"
                  className="lg:leading-lg lg:text-lg lg:mb-5 mb-12"
                >
                  Unlock the power of technology and transform your approach to
                  poker today with cutting-edge AI technology. Our advanced
                  Poker Assistant analyzes every move, providing real-time
                  insights to help you make data-driven decisions and master the
                  table.
                </Text>
                <div className="flex gap-x-2.5">
                  <Link href={ROUTES.REGISTER}>
                    <Button
                      className="bg-custom-gradient border-0"
                      size="xl"
                      rightSection={!isMobile && <ArrowRight />}
                    >
                      Get Started
                    </Button>
                  </Link>
                  <Button variant="outline" size="xl">
                    Watch Video
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        </BackgroundImage>
        <motion.div
          id="our-solution"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Container className="lg:py-16 py-24" size="xl">
            <div className="mb-14">
              <Text
                size="md"
                tt="uppercase"
                className="lg:text-sm lg:leading-sm opacity-30 mb-2"
              >
                quick start
              </Text>
              <Title size="h1">How It Works?</Title>
            </div>
            <div className="sm:gap-y-16 lg:flex-col lg:items-center lg:text-center flex justify-between gap-x-20">
              <div className="lg:flex lg:flex-col lg:items-center">
                <Image
                  width={isPhone ? 101 : 161}
                  height={isPhone ? 118 : 186}
                  className="relative lg:left-0 lg:bottom-0 -left-6 -bottom-4"
                  src={
                    isPhone
                      ? "/how-it-works-block-1-phone.png"
                      : "/how-it-works-block-1.png"
                  }
                  alt="block"
                />
                <Title size="h3" className="mb-2 relative">
                  Sign Up and Select Your Plan
                </Title>
                <Text className="lg:text-md lg:leading-md" size="lg">
                  Start your journey by creating an account and choosing the
                  plan that fits your needs. Access cutting-edge AI tools
                  designed to enhance your strategic decision-making.
                </Text>
              </div>
              <div className="lg:flex lg:flex-col lg:items-center">
                <Image
                  width={isPhone ? 101 : 161}
                  height={isPhone ? 118 : 186}
                  src={
                    isPhone
                      ? "/how-it-works-block-2-phone.png"
                      : "/how-it-works-block-2.png"
                  }
                  className="relative lg:left-0 lg:bottom-0 -left-6 -bottom-4"
                  alt="block"
                />
                <Title size="h3" className="mb-2 relative">
                  Integrate and Optimize
                </Title>
                <Text className="lg:text-md lg:leading-md" size="lg">
                  Connect the AI Assistant to your platform using API. Customize
                  its advanced analytics and insights to align with your unique
                  approach, powered by state-of-the-art machine learning.
                </Text>
              </div>
              <div className="lg:flex lg:flex-col lg:items-center">
                <Image
                  width={isPhone ? 101 : 161}
                  height={isPhone ? 118 : 186}
                  src={
                    isPhone
                      ? "/how-it-works-block-3-phone.png"
                      : "/how-it-works-block-3.png"
                  }
                  className="relative lg:left-0 lg:bottom-0 -left-6 -bottom-4"
                  alt="block"
                />
                <Title size="h3" className="mb-2 relative">
                  Analyze, Adapt, Excel
                </Title>
                <Text className="lg:text-md lg:leading-md" size="lg">
                  Leverage real-time AI-driven recommendations and post-session
                  analytics to refine your strategy. With every decision, unlock
                  the full potential of precision technology.
                </Text>
              </div>
            </div>
          </Container>
        </motion.div>
        <div className="lg:py-16 bg-blue-600 py-24" id="pricing">
          <motion.div
            id="our-solution"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Container size="xl">
              <div className="lg:mb-2.5 mb-10 text-center">
                <div className="lg:mb-8 mb-14">
                  <Text
                    size="md"
                    tt="uppercase"
                    className=" lg:text-sm lg:leading-sm text-white opacity-70 mb-2"
                  >
                    Pick Your Plan
                  </Text>
                  <Title className="text-white" size="h1">
                    Choose the plan that works for you
                  </Title>
                </div>
                <FloatingIndicator
                  className="m-auto mb-2"
                  data={["Billed monthly", "Billed Yearly"]}
                />
                <Text className="text-white">
                  Switch to yearly to save 20%, and get the ability to play
                  smarterer with AI precision.
                </Text>
              </div>
              <div className="lg:flex-col lg:gap-y-2.5 flex gap-x-5 items-center flex-wrap justify-center">
                {tariffsQuery.data?.tariffs.length &&
                  tariffsQuery.data.tariffs.map((tariff) => (
                    <div
                      key={tariff.id}
                      className="xl:p-6 lg:py-8 mt-4 lg:px-5 lg:basis-full lg:w-full lg:min-h-0 p-10 bg-white rounded-xl  min-h-[19rem] basis-1/5"
                    >
                      <Text
                        size="md"
                        tt="uppercase"
                        className="lg:text-sm lg:leading-sm lg:mb-0 opacity-30 mb-2.5"
                      >
                        {tariff.name}
                      </Text>
                      {/*<Title size="h3" className="lg:text-xl lg:leading-xl mb-7">*/}
                      {/*  Ace Up Your Sleeve*/}
                      {/*  {tariff.name}*/}
                      {/*</Title>*/}
                      <Flex
                        gap={15}
                        className="lg:mb-5 gap-x-1 flex-col justify-between mb-8 "
                      >
                        <Title size="h2">
                          {fromDecimal(tariff.totalPrice) +
                            " " +
                            tariff.currency}
                        </Title>
                        <Text
                          className="lg:text-sm mr-2 text-nowrap"
                          size={"sm"}
                        >
                          the cost of 1 request -{" "}
                          {tariff.currency + " " + fromDecimal(tariff.tipPrice)}
                        </Text>
                        <Text className="lg:text-sm mr-2 font-bold " size="h3">
                          {tariff.paidTipsCount} requests
                        </Text>
                        <Text size={"xl"}>
                          + {tariff.freeTipsCount} requests free
                        </Text>
                        <Button
                          size="lg"
                          variant={
                            tariff.name === "Base" ? "gradient" : "black"
                          }
                          fullWidth={isMobile}
                        >
                          Get {tariff.name} Plan
                        </Button>
                      </Flex>

                      {/*<ul className="list-disc flex flex-col gap-y-2 ml-4">*/}
                      {/*  <li className="lg:text-sm lg:leading:sm">*/}
                      {/*    Basic hand analysis and real-time suggestions.*/}
                      {/*  </li>*/}
                      {/*  <li className="lg:text-sm lg:leading:sm">*/}
                      {/*    Access to pre-flop strategies for common scenarios.*/}
                      {/*  </li>*/}
                      {/*  <li className="lg:text-sm lg:leading:sm">*/}
                      {/*    Weekly performance reports.*/}
                      {/*  </li>*/}
                      {/*  <li className="lg:text-sm lg:leading:sm">*/}
                      {/*    Community forum access for tips and tricks.*/}
                      {/*  </li>*/}
                      {/*</ul>*/}
                    </div>
                  ))}
              </div>
            </Container>
          </motion.div>
        </div>

        <motion.div
          id="company"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="lg:py-16  bg-gray-50 py-24"
        >
          <Container size="xl">
            <div className="lg:mb-8 text-center mb-14">
              <Text className="lg:text-sm lg:leading-sm opacity-30 uppercase mb-2">
                Questions? Answers!
              </Text>
              <Title size="h1">Frequently Asked Questions</Title>
            </div>
            <div>
              <Accordion>
                <Accordion.Item value="value1">
                  <Accordion.Control>What are Auto-clicker?</Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                    alias architecto aspernatur at autem ea eius est fugit illum
                    libero minima nihil provident, quia ratione totam? Adipisci
                    nostrum vel voluptatum!
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="value2">
                  <Accordion.Control>
                    How does commercial use work?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere fugit quisquam recusandae ullam vitae. Aliquam
                    consequatur dolore earum mollitia non. Commodi consequatur
                    dolore ipsa laboriosam laborum molestiae possimus recusandae
                    totam!
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="value3">
                  <Accordion.Control>
                    Can I cancel my subscription plan?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere fugit quisquam recusandae ullam vitae. Aliquam
                    consequatur dolore earum mollitia non. Commodi consequatur
                    dolore ipsa laboriosam laborum molestiae possimus recusandae
                    totam!
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="value5">
                  <Accordion.Control>
                    Can I upgrade my subscription plan?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere fugit quisquam recusandae ullam vitae. Aliquam
                    consequatur dolore earum mollitia non. Commodi consequatur
                    dolore ipsa laboriosam laborum molestiae possimus recusandae
                    totam!
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="value6">
                  <Accordion.Control>
                    How can I delete my account?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere fugit quisquam recusandae ullam vitae. Aliquam
                    consequatur dolore earum mollitia non. Commodi consequatur
                    dolore ipsa laboriosam laborum molestiae possimus recusandae
                    totam!
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="value7">
                  <Accordion.Control>
                    Where do I find and manage my survey data?
                  </Accordion.Control>
                  <Accordion.Panel>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere fugit quisquam recusandae ullam vitae. Aliquam
                    consequatur dolore earum mollitia non. Commodi consequatur
                    dolore ipsa laboriosam laborum molestiae possimus recusandae
                    totam!
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </Container>
        </motion.div>
        <footer className=" bg-gray-50">
          <Container size="xl">
            <div className="border-t border-[#00000026]">
              <div className="lg:gap-y-5 lg:flex-col lg:items-start flex py-7">
                <div className="lg:flex-col lg:items-start flex gap-x-1 items-center">
                  <Image
                    src="/minimal-logo.png"
                    width={24}
                    height={31}
                    alt="mini-logo"
                  />
                  <Text className="g:pl-0 p-2">
                    © 2024 Smarterer, Inc. All rights reserved
                  </Text>
                </div>
                <div className="lg:flex-col lg:ml-0  flex gap-x-1 ml-auto">
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Our Solution
                  </UnstyledButton>
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Pricing
                  </UnstyledButton>
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Company
                  </UnstyledButton>
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Conctact Sales
                  </UnstyledButton>
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Terms of Service
                  </UnstyledButton>
                  <UnstyledButton className="lg:pl-0 px-3.5 py-2">
                    Privacy Policy
                  </UnstyledButton>
                </div>
              </div>
            </div>
          </Container>
        </footer>
      </div>
      <Drawer
        opened={opened}
        onClose={handlers.close}
        padding="xl"
        size="100%"
        position="top"
        withCloseButton={true}
        classNames={{ root: "bg-gray-50" }}
      >
        <nav className="flex flex-col items-center">
          <Link href="#our-solution">
            <UnstyledButton
              onClick={handlers.close}
              className="px-3.5 py-2 font-semibold"
            >
              Our Solution
            </UnstyledButton>
          </Link>
          <Link href="#pricing">
            <UnstyledButton
              onClick={handlers.close}
              className="px-3.5 py-2 font-semibold"
            >
              Pricing
            </UnstyledButton>
          </Link>
          <Link href="#company">
            <UnstyledButton
              onClick={handlers.close}
              className="px-3.5 py-2 font-semibold"
            >
              Company
            </UnstyledButton>
          </Link>
          <UnstyledButton className="px-3.5 py-2 font-semibold">
            Contact Sales
          </UnstyledButton>
          <Link href={ROUTES.LOGIN}>
            <UnstyledButton className="px-3 py-2 font-semibold">
              Login
            </UnstyledButton>
          </Link>
          <Link href={ROUTES.REGISTER}>
            <Button
              className="bg-custom-gradient border-0 mt-2"
              size="md"
              radius="xs"
            >
              Get Started
            </Button>
          </Link>
        </nav>
      </Drawer>
    </>
  );
};
