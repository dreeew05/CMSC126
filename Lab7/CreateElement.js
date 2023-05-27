// Author: fiVe [G. Bulaong]
// Description Creates a new Div

export class CreateElement {

    constructor(elementType, idName, className) {
        this.elementType = elementType;
        this.idName      = idName;
        this.className   = className;
    }

    getElementType() {
        return this.elementType;
    }

    getIdName() {
        return this.idName;
    }

    getClassName() {
        return this.className;
    }

    createElement() {
        let element = document.createElement(this.getElementType());
        if(this.getIdName() != null) {
            element.setAttribute("id", this.getIdName());
        }
        if(this.getClassName() != null) {
            element.setAttribute("class", this.getClassName());
        }
        return element;
    }

}