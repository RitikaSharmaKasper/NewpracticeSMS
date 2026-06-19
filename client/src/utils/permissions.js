export const getPermissions = (user) => {
  return (
    user?.account?.role?.modulePermissions ||
    user?.role?.modulePermissions ||
    {}
  );
};

export const canAccess = (user, moduleName) => {
  const permissions = getPermissions(user);

  return permissions?.[moduleName]?.read === true;
};

export const canSubAction = (user, moduleName, subModule, action) => {
  const permissions = getPermissions(user);

  return (
    permissions?.[moduleName]?.subPermissions?.[subModule]?.[action] === true
  );
};