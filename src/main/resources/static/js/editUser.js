async function editUser(modal, id) {
    let oneUser = await userFetch.findOneUser(id);
    let user = await oneUser.json();

    modal.find('.modal-title').html('Edit user');

    modal.find('.modal-footer').html(`
        <button class="btn btn-info" id="editButton">Edit</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    `);

    const createEditForm = () => {
        return `
            <form class="form-group text-center" id="editUser">
                <div class="form-group">
                    <label for="userId" class="col-form-label">ID</label>
                    <input type="text" class="form-control username" id="userId" value="${user.userId}" readonly>
                </div>
                <div class="form-group">
                    <label for="name" class="com-form-label">First Name</label>
                    <input type="text" class="form-control" id="name" value="${user.name}">
                </div>
                <div class="form-group">
                    <label for="surname" class="com-form-label">Last Name</label>
                    <input type="text" class="form-control" id="surname" value="${user.surname}">
                </div>
                <div class="form-group">
                    <label for="age" class="com-form-label">Age</label>
                    <input type="number" class="form-control" id="age" value="${user.age}">
                </div>
                <div class="form-group">
                    <label for="username" class="col-form-label">Email</label>
                    <input type="text" class="form-control username" id="username" value="${user.username}">
                </div>
                <div class="form-group">
                    <label for="password" class="com-form-label">Password</label>
                    <input type="password" class="form-control" id="password" value="${user.password}">
                </div>
                <div class="form-group">
                    <label for="roles" class="com-form-label">Role</label>
                    <select multiple id="roles" size="2" class="form-control" style="max-height: 100px">
                        <option value="ROLE_USER">USER</option>
                        <option value="ROLE_ADMIN">ADMIN</option>
                    </select>
                </div>
            </form>
        `;
    };

    modal.find('.modal-body').html(createEditForm());

    $("#editButton").on('click', async () => {
        const checkedRoles = Array.from(document.querySelector('#roles').selectedOptions).map(option => option.value);

        const userId = modal.find("#userId").val().trim();
        const username = modal.find("#username").val().trim();
        const password = modal.find("#password").val().trim();
        const name = modal.find("#name").val().trim();
        const surname = modal.find("#surname").val().trim();
        const age = modal.find("#age").val().trim();

        const data = { userId, username, password, name, surname, age, roles: checkedRoles };

        const response = await userFetch.updateUser(data, id);

        if (response.ok) {
            await getUsers();
            modal.modal('hide');
        } else {
            const body = await response.json();
            const alert = `
                <div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                    ${body.info}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            modal.find('.modal-body').prepend(alert);
        }
    });

    modal.on('hidden.bs.modal', () => {
        $('#editUser')[0].reset();
    });
}
