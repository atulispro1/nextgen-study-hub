export default function NoteCard({note}) {

return(

<div className="glass" style={{padding:"20px"}}>

<h4>{note.title}</h4>

<p>Semester {note.semester}</p>
<p>{note.subject}</p>
<p>{note.category}</p>

<div style={{display:"flex",gap:"10px"}}>

<a href={note.file_url} target="_blank" className="btn-primary">
Preview
</a>

<a href={note.file_url} download className="btn-primary">
Download
</a>

</div>

</div>

);

}