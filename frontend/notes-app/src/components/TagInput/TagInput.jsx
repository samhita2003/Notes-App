function TagInput({onChange,tagTitle}) {
  return (
    <div>
     
      
       <input className="border border-gray-300 rounded-md outline-none p-2" placeholder="Add tags" type="text" value={tagTitle} onChange={onChange}/>
    </div>
  )
}

export default TagInput