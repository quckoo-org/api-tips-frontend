"use client";

import {
  Accordion,
  BackgroundImage,
  Burger,
  Container,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "@/shared/ui/button";
import { FloatingIndicator } from "@/shared/ui/floating-indicator";

type WelcomeLandingPageProps = {
  className?: string;
};

export const WelcomeLandingPage: FC<WelcomeLandingPageProps> = ({
  className,
}) => {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const isPhone = useMediaQuery("(max-width: 639px)");

  return (
    <div className={clsx("", className)}>
      <BackgroundImage
        src={isPhone ? "/landing-bg-phone.png" : "/landing-bg.png"}
        className="lg:min-h-0 lg:pb-8 min-h-[895px] text-white"
      >
        <header className="sm:mb-[400px] mb-[102.5px]">
          <Container className="py-6" size="xl">
            <div className="flex items-center">
              <div className="flex items-center gap-x-4">
                <Image src="/logo.svg" width={163} height={38} alt="logo" />
                <nav className="lg:hidden flex gap-x-1">
                  <UnstyledButton className="px-3.5 py-2 font-semibold">
                    Our Solution
                  </UnstyledButton>
                  <UnstyledButton className="px-3.5 py-2 font-semibold">
                    Pricing
                  </UnstyledButton>
                  <UnstyledButton className="px-3.5 py-2 font-semibold">
                    Company
                  </UnstyledButton>
                </nav>
              </div>
              <div className="lg:hidden flex items-center ml-auto gap-x-1">
                <UnstyledButton className="px-3.5 py-2 font-semibold">
                  Contact Sales
                </UnstyledButton>
                <UnstyledButton className="px-3 py-2 font-semibold">
                  Login
                </UnstyledButton>
                <Button
                  className="bg-custom-gradient border-0 ml-3"
                  size="md"
                  radius="xs"
                >
                  Get Started
                </Button>
              </div>
              {isMobile && (
                <Burger className="ml-auto text-white" color="white" />
              )}
            </div>
          </Container>
        </header>
        <Container size="xl">
          <div className="max-w-[820px]">
            <Title
              className="lg:mb-5 lg:text-4xl lg:leading-4xl mb-12"
              size="h1"
            >
              Play Smarter With AI Precision
            </Title>
            <Text
              size="xl"
              className="lg:text-sm lg:leading-md lg:mb-5 mb-12 leading-2xl "
            >
              Unlock the power of technology and transform your approach to
              poker today with cutting-edge AI technology. Our advanced Poker
              Assistant analyzes every move, providing real-time insights to
              help you make data-driven decisions and master the table.
            </Text>
            <div className="flex gap-x-2.5">
              <Button
                className="bg-custom-gradient border-0"
                size="xl"
                rightSection={!isMobile && <ArrowRight />}
              >
                Get Started
              </Button>
              <Button variant="outline" size="xl">
                Watch Video
              </Button>
            </div>
          </div>
        </Container>
      </BackgroundImage>

      <div>
        <Container className="lg:py-16 py-24" size="xl">
          <div className="lg:text-center lg:mb-8 mb-14">
            <Text
              tt="uppercase"
              className="lg:mb-1.5 lg:text-2xs lg:leading-sm opacity-30 mb-2"
            >
              quick start
            </Text>
            <Title className="lg:text-3xl lg:leading-4.5xl " size="h3">
              How It Works?
            </Title>
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
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm font-semibold mb-2 relative"
              >
                Sign Up and Select Your Plan
              </Text>
              <Text className="lg:text-2xs lg:leading-sm">
                Start your journey by creating an account and choosing the plan
                that fits your needs. Access cutting-edge AI tools designed to
                enhance your strategic decision-making.
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
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm font-semibold mb-2 relative"
              >
                Integrate and Optimize
              </Text>
              <Text className="lg:text-2xs lg:leading-sm">
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
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm font-semibold mb-2 relative"
              >
                Analyze, Adapt, Excel
              </Text>
              <Text className="lg:text-2xs lg:leading-sm">
                Leverage real-time AI-driven recommendations and post-session
                analytics to refine your strategy. With every decision, unlock
                the full potential of precision technology.
              </Text>
            </div>
          </div>
        </Container>
      </div>
      <div className="lg:py-16 bg-blue-700 py-24">
        <Container size="xl">
          <div className="lg:mb-2.5 mb-10 text-center">
            <div className="lg:mb-8 mb-14">
              <Text
                tt="uppercase"
                className="lg:text-2xs lg:leading-sm text-white opacity-70 mb-2"
              >
                Pick Your Plan
              </Text>
              <Title
                className="lg:text-3xl lg:leading-4.5xl text-white"
                size="h3"
              >
                Choose the plan that works for you
              </Title>
            </div>
            <FloatingIndicator
              className="m-auto mb-2"
              data={["Billed monthly", "Billed Yearly"]}
            />
            <Text className="text-white font-['Inter']">
              Switch to yearly to save 20%, and get the ability to play
              smarterer with AI precision.
            </Text>
          </div>
          <div className="lg:flex-col lg:gap-y-2.5 flex gap-x-5 items-center">
            <div className="xl:p-6 lg:py-8 lg:px-5 lg:basis-full lg:w-full lg:min-h-0 p-10 bg-white rounded-xl basis-1/3 min-h-[49rem]">
              <Text
                tt="uppercase"
                className="lg:text-xs lg:leading-xs lg:mb-0 opacity-30 mb-2.5"
              >
                Basic
              </Text>
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm lg:mb-5 font-semibold mb-7"
              >
                Ace Up Your Sleeve
              </Text>
              <div className="lg:mb-5 flex gap-x-1 items-end mb-8">
                <Title className="lg:text-5xl lg:leading-5xl" size="h2">
                  $17
                </Title>
                <Text className="lg:text-2xs lg:leading-sm mb-2.5">
                  / per month
                </Text>
              </div>
              <Button
                className="lg:mb-5 mb-10"
                size="lg"
                variant="black"
                fullWidth={isMobile}
                rightSection={<ArrowRight />}
              >
                Get Basic Plan
              </Button>
              <ul className="list-disc flex flex-col gap-y-2 ml-4">
                <li className="lg:text-2xs lg:leading-md">
                  Basic hand analysis and real-time suggestions.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Access to pre-flop strategies for common scenarios.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Weekly performance reports.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Community forum access for tips and tricks.
                </li>
              </ul>
            </div>
            <div className="xl:p-6 lg:py-8 lg:px-5 lg:basis-full lg:w-full lg:min-h-0 px-10 py-16 bg-white rounded-xl basis-1/3 min-h-[52rem] relative overflow-hidden">
              <Image
                width={360}
                height={340}
                className="lg:h-[231px] lg:w-[218px] lg:-top-6 lg:-right-20 h-[359px] w-[339px] absolute -right-40 top-4 -z-1"
                src="/plan-block-bg.png"
                alt="pattern"
              />
              <Text
                tt="uppercase"
                className="lg:text-xs lg:leading-xs lg:mb-0 opacity-30 mb-2.5"
              >
                Professional
              </Text>
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm lg:mb-5  font-semibold mb-7"
              >
                Royal Advantage
              </Text>
              <div className="lg:mb-5 flex gap-x-1 items-end mb-8">
                <Title className="lg:text-5xl lg:leading-5xl" size="h2">
                  $78
                </Title>
                <Text className="lg:text-2xs lg:leading-sm  mb-2.5">
                  / per month
                </Text>
              </div>
              <Button
                className="lg:mb-5 mb-10"
                size="lg"
                variant="gradient"
                fullWidth={isMobile}
                rightSection={<ArrowRight />}
              >
                Get Professional Plan
              </Button>
              <ul className="lg:max-w-none list-disc flex flex-col gap-y-2 max-w-64 ml-4">
                <li className="lg:text-2xs lg:leading-md">
                  All basic plan features.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Advanced decision-making insights.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Personalized strategy recommendations based on play history.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Real-time bluff detection and counter-strategies.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Priority access to new features.
                </li>
              </ul>
            </div>
            <div className="xl:p-6 lg:py-8 lg:px-5 lg:basis-full lg:w-full lg:min-h-0 p-10 bg-white rounded-xl basis-1/3 min-h-[49rem]">
              <Text
                tt="uppercase"
                className="lg:text-xs lg:leading-xs lg:mb-0 opacity-30 mb-2.5"
              >
                Elite
              </Text>
              <Text
                size="xl"
                className="lg:text-sm lg:leading-sm lg:mb-5 font-semibold mb-7"
              >
                Full House Mastery
              </Text>
              <div className="lg:mb-5 flex gap-x-1 items-end mb-8">
                <Title className="lg:text-5xl lg:leading-5xl" size="h2">
                  $124
                </Title>
                <Text className="lg:text-2xs lg:leading-sm mb-2.5">
                  / per month
                </Text>
              </div>
              <Button
                className="lg:mb-5 mb-10"
                size="lg"
                variant="black"
                fullWidth={isMobile}
                rightSection={<ArrowRight />}
              >
                Get Elit Plan
              </Button>
              <ul className="list-disc flex flex-col gap-y-2 ml-4">
                <li className="lg:text-2xs lg:leading-md">
                  All professional plan features.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Comprehensive game simulations and what-if scenarios.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  One-on-one strategy sessions with AI poker experts.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Access to exclusive high-level strategies and AI tools.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Unlimited hand history storage and analysis.
                </li>
                <li className="lg:text-2xs lg:leading-md">
                  Dedicated 24/7 support for instant troubleshooting and
                  guidance.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <div className="lg:py-16 bg-gray-100 py-24">
        <Container size="xl">
          <div className="lg:mb-8 text-center mb-14">
            <Text className="lg:text-2xs lg:leading-sm opacity-30 uppercase mb-2">
              Questions? Answers!
            </Text>
            <Title size="h3" className="lg:text-3xl lg:leading-4.5xl">
              Frequently Asked Questions
            </Title>
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
      </div>
      <footer className=" bg-gray-100">
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
                <Text className="lg:pl-0 p-2">
                  © 2024 Smarterer, Inc. All rights reserved
                </Text>
              </div>
              <div className="lg:flex-col lg:ml-0 flex gap-x-1 ml-auto">
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
  );
};
