import * as fs from 'fs';
import * as data from "../jsonDB/data.json";
import { uid } from "uid";
import { ARGS } from '../yargs/yargs.interface';
import * as rl from "readline";
import { cyan, red } from 'colors';
let todoList: TASK[] = [];

export const create = ({ description }) => {
    console.log('Creando');
    const toCreate: TASK = { description, status: false, id: uid(5) };
    todoList = readTask()
    todoList.push(toCreate);
    guardarDB()

}

export const list = () => {

    if(readTask().length === 0){
        console.log('--------------------------------------- \n');
        console.log(`No hay tareas creadas para crear una usa el comando:`);
        console.log(cyan(`app create -d [nombre-de-tarea] \n`));
        console.log('--------------------------------------- ');
        return;
    }

    readTask().forEach((task: TASK) => {
        console.log('--------------------------------------- \n');
        console.log(`ID: [${task.id}] | Description: ${task.description} | Status: [${task.status ? 'Done' : 'Waiting'}] \n`);
        console.log('---------------------------------------');
    });
}

export const update = ({ id }) => {
    console.log('Actualizando');
    todoList = readTask();
    todoList.forEach(task => {
        if (task.id === String(id)) task.status = !task.status;
    })

    guardarDB();
}

export const deleteTask = ({ id }) => {
    const input = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    input.question(`Estas seguro de querer borrar la tarea: ${id} | Y/N: `, (out) => {
        if (out.toLocaleUpperCase() === 'Y') {
            todoList = readTask().filter(task => task.id !== String(id));
            guardarDB();
        }
        else console.log('Se cancelo el borrado');
        input.close()
    })
}

const readTask = (): TASK[] => {
    console.log('Leyendo');
    return data.default;
};

const guardarDB = () => {
    console.log('Guardando');
    const input = JSON.stringify(todoList);
    fs.writeFile('src/jsonDB/data.json', input, (err) => console.log(err));
}

interface TASK extends ARGS {
    id: string;
};