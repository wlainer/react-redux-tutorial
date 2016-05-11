import React from 'react'
import { danger } from '../util/colors'

export default ({field, label}) => <div className="form-group">
    <label forHtml={field.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input type='text' className="form-control" {...field} />
      {field.touched && field.error && <div style={{color: 'white', backgroundColor: danger}}>{field.error}</div>}
    </div>
</div>
