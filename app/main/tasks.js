
// https://www.youtube.com/watch?v=mipb4N6ZzfM&ab_channel=Hasura
function getBaseLog(base, y) {
  return Math.log(y) / Math.log(base);
}

const convertAnswer = (value, unit) => {
  switch (unit) {
    case "Битах":
      return value;
    case "Байтах":
      return value /  8;
    case "Килобайтах":
      return value / 1024 /8;
    case "Мегабайтах":
      return value / 1024 / 1024/ 8;
    case "Гигабайтах":
      return value / 1024 / 1024/ 1024/ 8;

    default:
      console.log("error");
  }
};

const taskEgeInf7type1 = ({ imgX, imgY, colors, unit }) => {
  let bits = Math.ceil(getBaseLog(2, colors));
  let answer = imgX * imgY * bits;
  let convertedAnswer = convertAnswer(answer, unit);
  let roundedAnswer = Math.floor(convertedAnswer);
  return roundedAnswer;
};

export const generator = {
  taskEgeInf7type1: {
    execution: taskEgeInf7type1,

    task: "Какой минимальный объём памяти нужно \
  зарезервировать, чтобы можно было сохранить любое растровое \
  изображение размером [imgX]×[imgY] пикселей при условии, что в изображении \
  могут использоваться [colors] различных цветов? Ответ дайте в [unit]. В ответе запишите только целое \
  число, единицу измерения писать не нужно.",

    props: {
      prop0: {
        name: "imgX",
        type: "generator",
        title: "Разрешение по X",
        start: 128,
        end: 1024,
        step: 128,
      },

      prop1: {
        name: "imgY",
        type: "generator",
        title: "Разрешение по Y",
        start: 128,
        end: 1024,
        step: 128,
      },
      prop2: {
        name: "colors",
        type: "generator",
        title: "Количество цветов",
        start: 256,
        end: 1024,
        step: 128,
      },
      prop3: {
        name: "unit",
        type: "picklist",
        title: "Единицы измерения ответа",
        values: ["b", "bt", "Kb", "Mb", "Gb"],
        range: ["Битах", "Байтах", "Килобайтах", "Мегабайтах", "Гигабайтах"],
      },
    },
  },
};
