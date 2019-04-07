 export default class Todo {

    constructor(){
        this.COMPLETION_MARK = 'x';
        this.model = {
            completed : false,
            completionMark: '',
            priority : '',
            completionDate : '',
            creationDate : '',
            description : ''
        }
        this.value = '';
    }

    parse(value){
        this.value = value;
        this.model.completed = this.isCompleted();
        this.model.completionMark = this.isCompleted() ? this.COMPLETION_MARK : '';
        this.model.priority = this.priority();
        this.model.completionDate = this.completionDate();
        this.model.creationDate = this.creationDate();
        this.model.description = this.description();
        return this;
    }

    isCompleted(){
        return this.value.startsWith('x') ? true : false;
    }

    completionDate(){
        return this.isCompleted() ? this.value.substring(2,12) : '';
    }

    creationDate(){
        if (this.isCompleted()){
            return this.value.substring(13,23);
        } else if (this.priority() != ''){
            return this.value.substring(4,14);
        }
        else {
            return this.value.substring(0,10);
        }
    }
    
    priority(){
        return this.value.startsWith('(') ? this.value.substring(0,3) : '';
    }

    description(){
        let meta = (this.isCompleted() ? this.wrap(this.COMPLETION_MARK) : '')
            .concat(
            this.wrap(this.priority()),
            this.wrap(this.completionDate()),
            this.wrap(this.creationDate()
        ));
        let index = meta.length;
        return this.value.substring(index);
    }

    wrap(value){
        return value ? (value + ' ') : ''; 
    }

    stringify(){
        return this.value;
    }
 }