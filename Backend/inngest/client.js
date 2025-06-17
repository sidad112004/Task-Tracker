import {Inngest} from 'inngest';

const inngest = new Inngest({
   id: "task-tracker-backend",  
  name: "Task Tracker Backend",
  eventKey: process.env.INNGEST_EVENT_KEY ,

});

export default inngest;