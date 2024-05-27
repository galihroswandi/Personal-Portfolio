export const boxVariant = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.5,
    },
  },
};
