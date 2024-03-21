$(document).ready(function () {
  $('#tableAllUsers').on('click', '.deleteButton', async function () {
    const userId = $(this).closest('tr').find('td:first').text();
    const userName = $(this).closest('tr').find('td:nth-child(2)').text();

    $('#defaultModal').modal('show');
    $('#defaultModal')
      .find('.modal-title')
      .text('Удалить пользователя: ' + userName);
  });

  $('#defaultModal').on('click', '#confirmDelete', async function () {
    const userId = $('#defaultModal').find('#userId').val();
    await deleteUser($('#defaultModal'), userId);
  });
});

async function deleteUser(modal, userId) {
  let oneUser = await userFetch.findOneUser(userId);
  let user = await oneUser.json();

  modal.find('.modal-title').html('Delete user');

  let deleteButton = `<button  class="btn btn-danger" id="deleteButton">Delete</button>`;
  let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`;
  modal.find('.modal-footer').append(deleteButton);
  modal.find('.modal-footer').append(closeButton);

  modal.find('.modal-body').html(`
        <form class="form-group text-center" id="deleteUser">
            <div class="form-group">
                <label for="userId" class="col-form-label">ID</label>
                <input type="text" class="form-control username" id="userId" value="${
                  user.userId
                }" readonly>
            </div>
            <div class="form-group">
                <label for="name" class="com-form-label">First Name</label>
                <input type="text" class="form-control" id="name" value="${
                  user.name
                }" readonly>
            </div>
            <div class="form-group">
                <label for="surname" class="com-form-label">Last Name</label>
                <input type="text" class="form-control" id="surname" value="${
                  user.surname
                }" readonly>
            </div>
            <div class="form-group">
                <label for="age" class="com-form-label">Age</label>
                <input type="number" class="form-control" id="age" value="${
                  user.age
                }" readonly>
            </div>
            <div class="form-group">
                <label for="username" class="col-form-label">Email</label>
                <input type="text" class="form-control username" id="username" value="${
                  user.username
                }" readonly>
            </div>
            <div class="form-group">
                <label for="roles" class="com-form-label">Role:</label>
                <select id="roles" class="form-control select" size="2" name="roles" style="max-height: 100px" disabled>
                    ${user.roles
                      .map(role => `<option>${role.role.substr(5)}</option>`)
                      .join('')}
                </select>
            </div>
        </form>
    `);
  modal.find('.modal-footer').html(`
        <button type="button" class="btn btn-danger" id="deleteButton">Delete</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    `);

  $('#deleteButton').on('click', async () => {
    await userFetch.deleteUser(userId);
    await getUsers();
    modal.modal('hide');
  });
}
