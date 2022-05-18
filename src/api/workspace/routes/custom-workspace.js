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
        },
        {
            "method": "POST",
            "path": "/workspaces/addComment/",
            "handler": "workspace.addComment"
        },
        {
            "method": "GET",
            "path": "/workspaces/dashboard/:workspace",
            "handler": "workspace.dashboard"
        }
    ]
}
   