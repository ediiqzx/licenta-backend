module.exports = {
    routes: [
        {
            "method": "POST",
            "path": "/workspaces/createCustomRole/",
            "handler": "workspace.createCustomRole"
        },
        {
            "method": "POST",
            "path": "/workspaces/deleteCustomRole/",
            "handler": "workspace.deleteCustomRole"
        }
    ]
}
   