import { getCommand, outArgs } from "./yargs/yargs";
import { create, list, update, deleteTask } from './actions/actions';


const doThis = (command: string) => {
    const actions = {
        create,
        list,
        update,
        deleteTask
    }

    const err = () => console.log('El comando no existe');

    return actions[command] ? actions[command] : err;
};

doThis(getCommand)(outArgs);


;