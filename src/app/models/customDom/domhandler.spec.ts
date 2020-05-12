import { CustomDomHandler } from './customDomHandler';

describe('DomHandler', () => {

    it('should add single and multiple class to element', () => {
        const element = document.createElement("div");
        CustomDomHandler.addClass(element,"primeng");
        let mockElement = {classList:undefined,className:""};
        CustomDomHandler.addClass(mockElement,"primeng");
        expect(element.classList).toContain("primeng");
        expect(mockElement.className).toContain("primeng");
        CustomDomHandler.addMultipleClasses(element,"rocks! vamos!");
        CustomDomHandler.addMultipleClasses(mockElement,"rocks! vamos!");
        expect(element.classList.value).toContain("primeng rocks! vamos!");
        expect(mockElement.className).toContain("rocks! vamos!");
    });

    it('should remove class from element', () => {
        const element = document.createElement("div");
        CustomDomHandler.addClass(element,"primeng");
        let mockElement = {classList:undefined,className:""};
        CustomDomHandler.addClass(mockElement,"primeng");
        CustomDomHandler.removeClass(element,"primeng");
        CustomDomHandler.removeClass(mockElement,"primeng");
        expect(element.classList).not.toContain("primeng");
        expect(mockElement.className).not.toContain("primeng");
    });

    it('should check elemets class', () => {
        const element = document.createElement("div");
        CustomDomHandler.addClass(element,"primeng");
        let mockElement = {classList:undefined,className:""};
        CustomDomHandler.addClass(mockElement,"primeng");
        expect(CustomDomHandler.hasClass(element,"primeng")).toBeTruthy();
        expect(CustomDomHandler.hasClass(mockElement,"primeng")).toBeTruthy();
    });

    it('should get siblings', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("span");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(CustomDomHandler.siblings(element.children[0]).length).toEqual(2);
    });

    it('should remove child', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("span");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        CustomDomHandler.removeChild(element.children[1],element);
        expect(element.children.length).toEqual(2);
    });

    it('should check value isInteger', () => {
        expect(CustomDomHandler.isInteger(5)).toBeTruthy();
        expect(CustomDomHandler.isInteger("5")).toBeFalsy();
    });

    it('should get focusable elements', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("button");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(CustomDomHandler.getFocusableElements(element).length).toEqual(1);
    });

    it('should find element', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        CustomDomHandler.addClass(childEl,"primeng");
        CustomDomHandler.addClass(childEl3,"primeng");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(CustomDomHandler.find(element,"a").length).toEqual(2);
        expect(CustomDomHandler.findSingle(element,"a")).toBeTruthy();
        expect(CustomDomHandler.findSingle(null,"a")).toBeNull();
    });

    it('should find index', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        CustomDomHandler.addClass(childEl,"primeng");
        CustomDomHandler.addClass(childEl3,"primeng");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(CustomDomHandler.index(element.children[2])).toEqual(2);
    });

    it('should find index with indexWithinGroup', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("height","300px");
        childEl3.setAttribute("height","300px");
        CustomDomHandler.addClass(childEl,"primeng");
        CustomDomHandler.addClass(childEl3,"primeng");
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        expect(CustomDomHandler.indexWithinGroup(element.children[2],"height")).toEqual(1);
    });

    it('should use relativePosition', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("primeng","rocks!");
        childEl3.setAttribute("primeng","rocks!");
        CustomDomHandler.addClass(childEl,"primeng");
        CustomDomHandler.addClass(childEl3,"primeng");
        element.style.height = "200px";
        element.style.width = "200px";
        childEl3.style.height = "100px";
        childEl3.style.width = "100px";
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        CustomDomHandler.relativePosition(element.children[2],element);
        expect(childEl3.style.top).toEqual("0px");
        expect(childEl3.style.left).toEqual("0px");
    });

    it('should use absolutePosition', () => {
        const element = document.createElement("div");
        const childEl = document.createElement("p");
        const childEl2 = document.createElement("a");
        const childEl3 = document.createElement("a");
        childEl2.setAttribute("primeng","rocks!");
        childEl3.setAttribute("primeng","rocks!");
        CustomDomHandler.addClass(childEl,"primeng");
        CustomDomHandler.addClass(childEl3,"primeng");
        element.style.height = "200px";
        element.style.width = "200px";
        childEl3.style.height = "100px";
        childEl3.style.width = "100px";
        element.appendChild(childEl);
        element.appendChild(childEl2);
        element.appendChild(childEl3);
        CustomDomHandler.absolutePosition(element.children[2],element);
        expect(childEl3.style.top).toEqual("0px");
        expect(childEl3.style.left).toEqual("0px");
    });

    it('should get hidden element height and width', () => {
        const element = document.createElement("div");
        element.style.height = "0px";
        element.style.width = "0px";
        expect(CustomDomHandler.getHiddenElementOuterHeight(element)).toEqual(0);
        expect(CustomDomHandler.getHiddenElementOuterWidth(element)).toEqual(0);
    });
});
