export class ModalService {
    constructor() {
        this.modals = [];
    }
    add(modal) {
        // add modal to array of active modals
        this.modals.push(modal);
    }
    remove(id) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }
    open(id) {
        // open modal specified by id
        let modal = this.modals.filter(x => x.id === id)[0];
        modal.open();
    }
    close(id) {
        // close modal specified by id
        let modal = this.modals.filter(x => x.id === id)[0];
        modal.close();
    }
}
//# sourceMappingURL=modal.service.js.map