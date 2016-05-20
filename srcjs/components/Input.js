import React from 'react'
import { danger } from '../utils/colors'

export default ({field, label}) => {
  return (
   <div className="form-group">
    <label forHtml={field.name} >{label}</label>
    <input type='text' className="form-control" {...field} />
    {field.touched && field.error && <div style={{color: 'white', backgroundColor: danger}}>{field.error}</div>}
   </div>
   )
}
