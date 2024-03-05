import { updateDocInCollectionById } from "../../datamodel";

const taskEgeInf7type1 = ({ imgX, imgY, colors, unit, utils }) => {
  const [convertAnswer, getBaseLog] = utils;
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


const updateTasks = () => {
  // console.log('here we go')
  updateDocInCollectionById("tasks2", "taskEgeInf7type1", { "generator": JSON.stringify(generator.taskEgeInf7type1), "function": taskEgeInf7type1.toString() });
};

updateTasks();
