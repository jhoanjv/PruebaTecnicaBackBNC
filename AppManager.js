class AppManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
        this.init();
    }

    init() {
        $('#user-form').on('submit', (e) => this.saveUser(e));
        $('#user-table').on('click', '.edit-btn', (e) => this.editUser($(e.target).data('id')));
        $('#user-table').on('click', '.delete-btn', (e) => this.deleteUser($(e.target).data('id')));
    }

    saveUser(e) {
        e.preventDefault();
        const name = $('#user-name').val();
        const email = $('#user-email').val();
        const id = $('#user-id').val();

        if (id) {

            this.users = this.users.map(user => user.id == id ? new User(Number(id), name, email) : user);
        } else {
            // Agregar nuevo usuario
            this.users.push(new User(this.nextId++, name, email));
        }

        $('#user-form')[0].reset();
        $('#user-id').val('');
        this.renderUserTable();
    }

    // Edita un usuario
    editUser(id) {
        const user = this.users.find(user => user.id == id);
        if (user) {
            $('#user-name').val(user.name);
            $('#user-email').val(user.email);
            $('#user-id').val(user.id);
        }
    }
    
    // Elimina un usuario
    deleteUser(id) {
        this.users = this.users.filter(user => user.id != id);
        this.renderUserTable();
    }

    // Renderiza la tabla de usuarios
    renderUserTable() {
        const userRows = this.users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Editar</button>
                    <button class="delete-btn" data-id="${user.id}">Eliminar</button>
                </td>
            </tr>
        `);
        $('#user-table tbody').html(userRows);
    }
}


