var syncUsers = {};

module.exports = {appsync, sync, syncOff}

function sync(id){
    console.log("updated " + id + " to " + true);
    syncUsers[id] = true;
}

function syncOff(id){
    console.log("updated " + id + " to " + false);
    syncUsers[id] = false;
}

function appsync(app, apiLocation) {
    app.get(apiLocation + '/:id', function(req, res) {
        const id = Number(req.params.id);
        if(id){
            if(syncUsers[id] == undefined) {
                syncUsers[id] = false;
            } else if (syncUsers[id]){
                syncUsers[id] = false;
                return res.json({update: true});
            }
            return res.json({update: false});
        }
        return res.json({response : 'Error'});
	});
}