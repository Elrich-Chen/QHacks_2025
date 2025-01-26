"use client";

import type { NextPage } from 'next';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from '../styles/page.module.css';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

const LandingPage: NextPage = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleClick = () => {
    router.push('/listing'); // Navigate to /listing
  };

  useEffect(() => {
    setIsClient(true); // Ensures this code runs only after the component mounts on the client
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner or some placeholder while the client-side code is loading
  }

  return (
    <div className={styles.landingPage}>
      <div className={styles.landingPageChild} />
      <Image className={styles.unionIcon} width={630} height={645} alt="" src="/Union.svg" />
      <Image className={styles.logo} width={630} height={645} alt="" src="/logo.png" />

      <div className={styles.leaseMeBeforeContainer}>
        <p className={styles.leaseMeBefore}>{`Lease Me Before `}</p>
        <p className={styles.leaseMeBefore}>You Go Go</p>
      </div>

      <div className={styles.rentSmartAskContainer}>
        <p className={styles.leaseMeBefore}>{`Rent Smart `}</p>
        <p className={styles.leaseMeBefore}>Ask Smarter</p>
      </div>

      <div className={styles.houseHuntingShould}>
        House hunting should be easy, learn to negotiate better by chatting with our AI agents, and see if you really know your way around signing a house.
      </div>

      <div className={styles.startButton}>
        <div className={styles.startButtonChild} />
        <button onClick={handleClick}>
          <b className={styles.start}>Start</b>
        </button>
      </div>

      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.howFarIs}>How far is the property from campus?</div>
      </div>

      <div className={styles.rectangleGroup}>
        <div className={styles.groupItem} />
        <div className={styles.howFarIs}>Is there a parking spot or is it additional?</div>
      </div>
      <div className={styles.rectangleContainer}>
        <div className={styles.groupInner} />
        <div className={styles.whenWasThe}>When was the place built?</div>
      </div>
      <div className={styles.groupDiv}>
        <div className={styles.groupOuter} />
        <div className={styles.howMuchIs}>How much is the utilities each month?</div>
      </div>
      <div className={styles.rectangleParent1}>
        <div className={styles.groupInner} />
        <div className={styles.whenWasThe}>Is the property furnished?</div>
      </div>
      
      <div className={styles.askTheRight}>Ask the right questions and avoid the wrong actions</div>

      <div className={styles.description}>
        <div className={styles.ourSimulationTakes}>
          {`Our simulation takes you through a chat with our “Landlords” using Google Gemini to recreate real interactions students face when inquiring about houses.`}
        </div>
        <div className={styles.descriptionChild} />
        <div className={styles.descriptionItem} />
        <div className={styles.descriptionInner} />
        <div className={styles.rectangleDiv} />
        <div className={styles.toHelpUsers}>
          To help users with their house renting literacy, providing a safe environment for users to learn the key aspects of today’s housing market
        </div>
        <div className={styles.howDoesIt}>How does it Work?</div>
        <div className={styles.ourGoal}>Our Goal?</div>
      </div>

      <div className={styles.toolBar}>
        <div className={styles.about}>About</div>
        <div className={styles.faq}>FAQ</div>
        <div className={styles.home}>{`Home `}</div>
      </div>

    </div>
  );
};

export default LandingPage;
