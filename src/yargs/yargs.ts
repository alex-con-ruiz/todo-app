import { ARGS } from "./yargs.interface";

const opts = {
    description: {
        alias: 'd',
        default: ''

    },
    status: {
        alias: 'u',
        default: false
    },
    id: {
        default: null
    }
}


// tslint:disable-next-line: no-var-requires
const argv = require('yargs')
    .command('create', 'crea una nueva tarea', opts)
    .command('list', 'imprime las tareas', opts)
    .command('update', 'actualiza las tareas', opts)
    .command('delete', 'borra una tarea selecionada', opts)
    .help()
    .argv;


export const getCommand = argv._[0];
export let outArgs: ARGS;


const getArgs = (args: ARGS) => {
    const { description, status, id } = args
    return { description, status, id };
}

outArgs = getArgs(argv)


