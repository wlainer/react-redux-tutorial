import React from 'react'
import { danger } from '../util/colors'

export default ({field, label, options, ...props}) => <div className="form-group">
    <label forHtml={field.name} className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <select type='text' className="form-control" {...field} {...props} >
          <option></option>
          {options.map(c => <option value={c.id} key={c.id} >{c.name}</option>)}
      </select>
      {field.touched && field.error && <div style={{color: 'white', backgroundColor: danger}}>{field.error}</div>}
    </div>
</div>
