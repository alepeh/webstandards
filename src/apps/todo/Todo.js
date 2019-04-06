 export default class Todo {

    constructor(){
        this.COMPLETION_MARK = 'x ';
        this.model = {
            completed : false,
            priority : '',
            completionDate : '',
            creationDate : '',
            description : ''
        }
        this.oldValue = '';
    }

    parse(value){
        this.oldValue = value;
        this.model.completed = this.isCompleted(value);
        this.model.priority = this.priority(value);
        this.model.completionDate = this.completionDate(value);
        this.model.creationDate = this.creationDate(value);
        this.model.description = this.description(value);
        return this;
    }

    isCompleted(value){
        return value.startsWith('x') ? true : false;
    }

    completionDate(value){
        return this.isCompleted(value) ? value.substring(2,12) : '';
    }

    creationDate(value){
        if (this.isCompleted(value)){
            return value.substring(13,23);
        } else if (this.priority(value) != ''){
            return value.substring(3,14);
        }
        else {
            return value.substring(0,10);
        }
    }
    
    priority(value){
        return value.startsWith('(') ? value.substring(0,3) : '';
    }

    description(value){
        let index = this.wrap(this.priority(value))
        .concat(this.wrap(this.creationDate(value),
        this.wrap(this.completionDate(value))
        )).length;
        return value.substring(index-1);
    }

    wrap(value){
        return value ? (value + ' ') : ''; 
    }

    stringify(){
        return this.wrap(this.model.completed ? this.COMPLETION_MARK : '')
            .concat(this.wrap(this.model.completionDate), 
                this.wrap(this.model.priority),
                this.wrap(this.model.creationDate),
                this.wrap(this.model.description)
                );
    }
 }