const roleList = [
  { id: 1, role: 'ROLE_USER' },
  { id: 2, role: 'ROLE_ADMIN' },
];
let isUser = true;

$(async function () {
  await getUser();
  await tittle();
  await getUsers();
  await getNewUserForm();
  await getDefaultModal();
  await createUser();
});

const userFetch = {
  head: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Referer: null,
  },
  findAllUsers: async () => await fetch('api/users'),
  findUserByUsername: async () => await fetch('api/user'),
  findOneUser: async id => await fetch(`api/users/${id}`),
  addNewUser: async user =>
    await fetch('api/users', {
      method: 'POST',
      headers: userFetch.head,
      body: JSON.stringify(user),
    }),
  updateUser: async (user, id) =>
    await fetch(`api/users/${id}`, {
      method: 'PUT',
      headers: userFetch.head,
      body: JSON.stringify(user),
    }),
  deleteUser: async id =>
    await fetch(`api/users/${id}`, {
      method: 'DELETE',
      headers: userFetch.head,
    }),
};

async function getUser() {
  const table = $('#tableUser tbody');
  await userFetch
    .findUserByUsername()
    .then(res => res.json())
    .then(user => {
      let temp = `
                <tr>
                    <td>${user.userId}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(e => ' ' + e.role.substr(5))}</td>
                </tr>
            `;
      table.html(temp);

      let hasAdminRole = false;
      for (let i = 0; i < user.roles.length; i++) {
        let role = user.roles[i].role;
        if (role === 'ROLE_ADMIN') {
          hasAdminRole = true;
        }
      }
      isUser = !hasAdminRole;
      if (isUser) {
        $('#userTable, #userTab').addClass('show active');
        $('#adminTable, #adminTab').removeClass('show active');
      } else {
        $('#adminTable, #adminTab').addClass('show active');
        $('#userTable, #userTab').removeClass('show active');
      }
    });
}

async function tittle() {
  const h1a1 = $('#h1a1');
  if (isUser) {
    h1a1.html(`<h1 class="h1 a1" id="h1a1">User information page</h1>`);
  } else {
    h1a1.html(`<h1 class="h1 a1" id="h1a1">Admin panel</h1>`);
  }
}

async function getUsers() {
  const table = $('#tableAllUsers tbody');
  await userFetch
    .findAllUsers()
    .then(res => res.json())
    .then(users => {
      let temp = users
        .map(
          user => `
                <tr>
                    <td>${user.userId}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.username}</td>
                    <td>${user.roles.map(e => ' ' + e.role.substr(5))}</td>
                    <td>
                        <button type="button" data-userid="${
                          user.userId
                        }" data-action="edit" class="btn btn-info"
                            data-toggle="modal" data-target="#editModal">Edit</button>
                    </td>
                    <td>
                        <button type="button" data-userid="${
                          user.userId
                        }" data-action="delete" class="btn btn-danger"
                            data-toggle="modal" data-target="#deleteModal">Delete</button>
                    </td>
                </tr>
            `
        )
        .join('');
      table.html(temp);

      $('#tableAllUsers')
        .find('button')
        .on('click', event => {
          const defaultModal = $('#defaultModal');
          const targetButton = $(event.target);
          const buttonUserId = targetButton.attr('data-userid');
          const buttonAction = targetButton.attr('data-action');

          defaultModal.attr('data-userid', buttonUserId);
          defaultModal.attr('data-action', buttonAction);
          defaultModal.modal('show');
        });
    });
}

async function getNewUserForm() {
  $('#addUser').on('click', () => {
    $('#addForm').show();
  });
}

async function getDefaultModal() {
  $('#defaultModal')
    .modal({
      keyboard: true,
      backdrop: 'static',
      show: false,
    })
    .on('show.bs.modal', event => {
      const thisModal = $(event.target);
      const userid = thisModal.attr('data-userid');
      const action = thisModal.attr('data-action');
      switch (action) {
        case 'edit':
          editUser(thisModal, userid);
          break;
        case 'delete':
          deleteUser(thisModal, userid);
          break;
      }
    })
    .on('hidden.bs.modal', e => {
      const thisModal = $(e.target);
      thisModal.find('.modal-title').html('');
      thisModal.find('.modal-body').html('');
      thisModal.find('.modal-footer').html('');
    });
}

async function infoUser() {
  await getUser();
}
