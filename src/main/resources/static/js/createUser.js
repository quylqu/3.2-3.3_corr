async function createUser() {
  $('#addUser').on('click', async () => {
    const data = extractFormData();

    const response = await userFetch.addNewUser(data);
    await getUsers();

    const fieldsToReset = [
      '#nameCreate',
      '#surnameCreate',
      '#ageCreate',
      '#usernameCreate',
      '#passwordCreate',
    ];
    fieldsToReset.forEach(field => $(field).val(''));

    $(".nav-tabs a[href='#adminTable']").tab('show');
  });
}

const checkedRoles = () => {
  const array = [];
  const options = document.querySelector('#rolesCreate').options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      array.push(roleList[i]);
    }
  }
  return array;
};

const extractFormData = () => {
  const addUserForm = $('#addForm');
  const data = {
    name: addUserForm.find('#nameCreate').val().trim(),
    surname: addUserForm.find('#surnameCreate').val().trim(),
    age: addUserForm.find('#ageCreate').val().trim(),
    username: addUserForm.find('#usernameCreate').val().trim(),
    password: addUserForm.find('#passwordCreate').val().trim(),
    roles: checkedRoles(),
  };
  return data;
};
