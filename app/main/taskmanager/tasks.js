import { updateDocInCollectionById } from "../../datamodel";

const taskEgeInf7type1 = ({ imgX, imgY, colors, unit, utils }) => {
  const [convertAnswer, getBaseLog] = utils;
  let bits = Math.ceil(getBaseLog(2, colors));
  let answer = imgX * imgY * bits;
  let convertedAnswer = convertAnswer(answer, unit);
  let roundedAnswer = Math.floor(convertedAnswer);
  return roundedAnswer
};



export const generator = {
  taskEgeInf7type1: {
    // execution: taskEgeInf7type1,

    task: "Какой минимальный объём памяти нужно \
  зарезервировать, чтобы можно было сохранить любое растровое \
  изображение размером [imgX]×[imgY] пикселей при условии, что в изображении \
  могут использоваться [colors] различных цветов? Ответ дайте в [unit]. В ответе запишите только целое \
  число, единицу измерения писать не нужно.",

    order: ["prop0","prop1","prop2","prop3"],
    props: {
      prop0: {
        name: "imgX",
        type: "generator",
        title: "Разрешение по X",
        start: 128,
        end: 256,
        step: 128,
        range: [128,256]
        // range: [128,256,384,512,640,768,896,1024]
      },

      prop1: {
        name: "imgY",
        type: "generator",
        title: "Разрешение по Y",
        start: 128,
        end: 384,
        step: 128,
        range: [128,256,384]
        // range: [128,256,384,512,640,768,896,1024]

      },
      prop2: {
        name: "colors",
        type: "generator",
        title: "Количество цветов",
        start: 256,
        end: 384,
        step: 128,
        // range: [256,384,512,640,768,896,1024]
        range: [256,384]
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


export const  updateTasks = () => {
  updateDocInCollectionById("tasks2", "taskEgeInf7type1", { "generator": generator['taskEgeInf7type1'], "function": taskEgeInf7type1.toString(), "name":"Такая фот задача" });
  // updateDocInCollectionById("tasks2", "taskEgeInf7type1", { "generator": JSON.stringify(generator.taskEgeInf7type1), "function": taskEgeInf7type1.toString(), "name":"Такая фот задача" });
};


