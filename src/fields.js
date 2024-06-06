const fields =[
 {
    "field_is": "text_fields",
    "name":"name",
    "label":"Name",
    "placeholder": "Enter your name",
    "default" : "",
    "type":"text",
    "helper_text": "",
    "variant": "outlined",
     "error" :"this field is required",
    "filters": {
        "auto_complete": true,
        "auto_focus": true,
        "required": true,
        "hideLabel": false,
        "validations": true,
        "fullWidth": true
      },
      "controller": {
        "rules": {
            "required": "Plese enter your name",
            "pattern": {
                "value": "/^[a-zA-Z0-9]+$/",
                "message": "This pattern is not allowed"
            
            },
            "minLength": {
              "value": 5,
              "message": "Minimum length is 6 characters"
            },
            "maxLength": {
              "value": 20,
              "message": "Maximum length is 20 characters"
            }
          },
      }
 }
]

export default fields;