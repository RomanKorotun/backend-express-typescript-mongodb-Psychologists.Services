export const handleSaveError = () => {
    (error, data, callback) => {
        error.status = 400;
        callback();
    };
};
export const handleAddSettings = function (callback) {
    this.options.new = true;
    this.options.runValidators = true;
    callback();
};
//# sourceMappingURL=hooks.js.map