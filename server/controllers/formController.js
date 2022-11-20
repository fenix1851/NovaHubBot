class formController {
    async specialist(req, res) {
        res.sendFile(path.join(__dirname, '../static/specialist_form.html'));
    }
}