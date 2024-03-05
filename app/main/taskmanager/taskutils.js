export const useTaskutils = () => {
  const getBaseLog = (base, y) => {
    return Math.log(y) / Math.log(base);
  };

  const convertAnswer = (value, unit) => {
    switch (unit) {
      case "Битах":
        return value;
      case "Байтах":
        return value / 8;
      case "Килобайтах":
        return value / 1024 / 8;
      case "Мегабайтах":
        return value / 1024 / 1024 / 8;
      case "Гигабайтах":
        return value / 1024 / 1024 / 1024 / 8;

      default:
        console.log("error");
    }
  };

  return [convertAnswer, getBaseLog];
};
