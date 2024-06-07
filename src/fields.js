const fields = [
    {
      "field_is": "text_fields",
      "name": "name",
      "label": "Name",
      "placeholder": "Enter your name",
      "default_value": "",
      "type": "text",
      "helper_text": "",
      "variant": "outlined",
      "error": "This field is required",
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
          "required": "Please enter your name",
        //   "pattern": {
        //     "value": /^[a-zA-Z0-9]+$/,
        //     "message": "This pattern is not allowed"
        //   },
          "minLength": {
            "value": 5,
            "message": "Minimum length is 6 characters"
          },
          "maxLength": {
            "value": 20,
            "message": "Maximum length is 20 characters"
          }
        }
      }
    },
    {
      "field_is": "selector",
      "name": "country",
      "label": "Country",
      "options": [
        { "label": "USA", "value": "USA" },
        { "label": "Canada", "value": "Canada" },
        { "label": "UK", "value": "UK" },
        { "label": "Australia", "value": "Australia" }
      ],
      "default_value": "",
      "type": "dropdown",
      "helper_text": "",
      "variant": "outlined",
      "filters": {
        "auto_complete": true,
        "auto_focus": false,
        "error": false,
        "disabled": false,
        "required": true,
        "hideLabel": false,
        "validations": true,
        "fullWidth": true
      },
      "controller": {
        "rules": {
          "required": {
            "value": true,
            "message": "Please select a country"
          },
          "validate": {
            "allowedValues": value => ["USA", "Canada", "UK", "Australia"].includes(value) || "Please select a valid country from the list."
          }
        }
      }
    },
    {
      "field_is": "toggle_button",
      "name": "toggle",
      "label": "Switch",
      "default_value": false,
      "type": "boolean",
      "style": {},
      "helper_text": "",
      "variant": "",
      "filters": {
        "auto_complete": false,
        "auto_focus": false,
        "multiline": false,
        "disabled": false,
        "required": false,
        "hideLabel": false,
        "fullWidth": true
      },
      "validations": {
        "customValidation": "validateToggle",
        "customErrorMessage": "Please customize this error message",
        "minValue": false,
        "maxValue": true,
        "mustBeTrue": true,
        "mustBeFalse": false
      },
      "controller": {
        "name": "",
        "control": "",
        "rules": {
          "validateToggle": {
            "rule": value => value === true || value === false,
            "message": "Toggle value must be either true or false."
          },
          "minValue": {
            "rule": value => value === false,
            "message": "Minimum value should be false."
          },
          "maxValue": {
            "rule": value => value === true,
            "message": "Maximum value should be true."
          },
          "mustBeTrue": {
            "rule": value => value === true,
            "message": "The toggle must be set to true."
          },
          "mustBeFalse": {
            "rule": value => value === false,
            "message": "The toggle must be set to false."
          }
        }
      }
    },
    {
        "field_is": "autocomplete",
        "name": "autocomplete",
        "label": "Autocomplete",
        "placeholder": "Start typing...",
        "default_value": [], // Changed the default value to an empty array
        "type": "autocomplete",
        "style": {},
        "helper_text": "",
        "variant": "",
        "options": [
          { "label": "Option 1", "value": "Option 1" },
          { "label": "Option 2", "value": "Option 2" },
          { "label": "Option 3", "value": "Option 3" }
        ],
        "filters": {
          "auto_complete": true,
          "error": false,
          "hideLabel": false,
          "auto_focus": true,
          "disabled": false,
          "required": true,
          "autoHighlight": false,
          "autoSelect": false,
          "multiple": true,
          "validations": true,
          "fullWidth": true
        },
        "controller": {
          "rules": {
            "required": {
                "value": true,
                "message": "Please select an option"
              },
            "allowedValues": {
              "rule": value => value.length === 0 || value.every(item => ['Option 1', 'Option 2', 'Option 3'].includes(item)),
              "message": "Invalid option selected."
            },
            "minSelections": {
              "rule": value => value.length >= 1,
              "message": "Please select at least 1 option."
            },
            "maxSelections": {
              "rule": value => value.length <= 3,
              "message": "You cannot select more than 3 options."
            },
            "validateOptionLength": {
              "rule": value => value.every(item => item.length >= 3 && item.length <= 20),
              "message": "Option length should be between 3 and 20 characters."
            },
            "minOptionLength": {
              "rule": value => value.every(item => item.length >= 3),
              "message": "Option length should be at least 3 characters."
            },
            "maxOptionLength": {
              "rule": value => value.every(item => item.length <= 20),
              "message": "Option length cannot exceed 20 characters."
            },
            "validateOptionFormat": {
              "rule": value => value.every(item => /^[a-zA-Z0-9]+$/.test(item)),
              "message": "Option format is invalid. Only alphanumeric characters are allowed."
            }
          },
          "custom": {}
        }
      }
          
  ];
  
  export default fields
  