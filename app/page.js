"use client";
import Image from "next/image";
import { Propinput } from "./components/propinput";
import { useEffect, useState } from "react";
import { RangeManager } from "./components/rangemanager";
import { TaskProps } from "./components/taskprops";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

function getBaseLog(base, y) {
  return Math.log(y) / Math.log(base);
}

const convertAnswer = (value, toUnit) => {
  switch (toUnit) {
    case "Kb":
      return value / 1024 / 8;
    default:
      console.log("error");
  }
};

const generator = {
  taskEgeInf7type1: {

    task: "Какой минимальный объём памяти (в Кбайт) нужно \
зарезервировать, чтобы можно было сохранить любое растровое \
изображение размером [imgX]×[imgY] пикселей при условии, что в изображении \
могут использоваться [colors] различных цветов? В ответе запишите только целое \
число, единицу измерения писать не нужно.",

    props: [
      {
        name: "imgX",
        type: "generator",
        title: "Разрешение по X",
        start: 128,
        end: 1024,
        step: 128,
      },
      {
        name: "imgY",
        type: "generator",
        title: "Разрешение по Y",
        start: 128,
        end: 1024,
        step: 128,
      },
      {
        name: "colors",
        type: "generator",
        title: "Количество цветов",
        start: 256,
        end: 1024,
        step: 128,
      },
      {
        name: "units",
        type: "picklist",
        title: "Единицы измерения ответа",
        values: ["b", "bt", "Kb", "Mb", "Gb"],
        titles: ["Битах", "Байтах", "Килобайтах", "Мегабайтах", "Гигабайтах"],
      },
    ],
  },
};

const taskEgeInf7type1 = ({imgX, imgY, colors},convertion) => {
  let bits = Math.ceil(getBaseLog(2, colors));
  let answer = imgX * imgY * bits;
  let convertedAnswer = convertAnswer(answer, convertion);
  let roundedAnswer = Math.floor(convertedAnswer);
  return  roundedAnswer
};

const makeObject=(a,b)=>{
  let obj = {};

a.forEach((item,index)=>{obj[item]=b[index]})
console.log(obj)
return obj
}

// const rows = [
//   { id: 1, col1: 'Hello', col2: 'World' },
//   { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
//   { id: 3, col1: 'MUI', col2: 'is Amazing' },
// ];

const columns = [
  { field: 'col0', headerName: 'Column 1', width: 150 },
  { field: 'col1', headerName: 'Column 2', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

export default function Home() {
  // taskEgeInf7type1(128, 128, 256, "Kb");
  const [rows,setRows]=useState([])

  const [taskProfile, setTaskProfile] = useState();
  const [variants, setVariants] = useState([]);
  const [tasksShown, setTasksShown] = useState();
  // console.log('rerenderX',taskProfile)
  useEffect(() => {
    setTaskProfile(generator["taskEgeInf7type1"]);
  }, []);

 

  return (
    <>
      <textarea
        className="w-full h-60"
        name="postContent"
        rows={4}
        cols={40}
        defaultValue={taskProfile != undefined && taskProfile.task}
      />
      {taskProfile != undefined && (
        <TaskProps
          setVariants={setVariants}
          taskProfile={taskProfile}
          setTaskProfile={setTaskProfile}
          setRows={setRows}
        />
      )}
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
      {/* <table>
        <tbody>
          <tr>           
            {taskProfile != undefined &&
              taskProfile.props
                .filter((item) => item.range != undefined)
                .map((item) => <th>{item.name}</th>)}
                <th>ответ</th>
          </tr>
        </tbody>
        {variants.map((item) => (
          <tr>
            {item.map((item) => (
              <td>{item}</td>
            ))}

            <td>{taskEgeInf7type1(makeObject(['imgX','imgY','colors'],item),'Kb')}</td>
          </tr>
        ))}
      </table> */}
    </>
  );
}
