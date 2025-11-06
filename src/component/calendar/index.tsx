.calendar {
  .calendar-wrapper {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 1.8rem 1rem 0;
    border: 1px solid var(--light-grey-color);
    border-radius: 0.75rem;
    background-color: var(--white-color);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
    overflow: hidden;

    > div {
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--dark-color);
      position: relative;

      &.head {
        aspect-ratio: auto;
        background-color: var(--light-grey-color);
        font-weight: 600;
        font-size: 1rem;
        padding: 0.8rem 0;
      }

      &.wedding-date {
        background: var(--theme-bg-color);
        position: relative;
        overflow: hidden;
        span {
          position: relative;
          z-index: 2;
          font-weight: 700;
        }

        .fireflies {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fireflies::before,
        .fireflies::after {
          content: "";
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--theme-color);
          opacity: 0.7;
          filter: blur(2px);
          box-shadow:
            0 0 8px var(--theme-color),
            0 0 14px rgba(255, 160, 160, 0.6);
          animation: firefly 3.5s ease-in-out infinite alternate;
        }

        .fireflies::before {
          top: 30%;
          left: 40%;
          animation-delay: 0.5s;
        }

        .fireflies::after {
          top: 60%;
          left: 55%;
          width: 4px;
          height: 4px;
          opacity: 0.6;
          animation-delay: 1.3s;
        }
      }
    }
  }

  @keyframes firefly {
    0% {
      transform: translate(0, 0) scale(1);
      opacity: 0.6;
    }
    50% {
      transform: translate(3px, -3px) scale(1.15);
      opacity: 1;
    }
    100% {
      transform: translate(-3px, 3px) scale(0.9);
      opacity: 0.5;
    }
  }

  .countdown-wrapper {
    margin-top: 2.5rem;
    text-align: center;

    .message {
      font-size: 1.2rem;
      line-height: 1.9;

      .d-day {
        display: inline-block;
        margin-top: 0.6rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--theme-color);
        text-shadow:
          0 1px 3px rgba(255, 133, 133, 0.25),
          0 0 8px rgba(255, 230, 230, 0.3);
      }
    }
  }
}
