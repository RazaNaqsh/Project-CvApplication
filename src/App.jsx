import { nanoid } from "nanoid";
import React from "react";
import Preview from "./components/Preview";

function App() {
	//* general info field

	const [generalInfo, setGeneralInfo] = React.useState({
		name: "",
		email: "",
		phone: "",
	});

	function handleGeneralInfo(e) {
		const { name, value } = e.target;
		setGeneralInfo((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}
	// console.log(generalInfo);

	const generalInfoArr = ["name", "email", "phone"];
	const generalInputElements = generalInfoArr.map((item, index) => {
		return (
			<label key={index}>
				{item}
				<input
					type="text"
					onChange={handleGeneralInfo}
					name={item}
					value={generalInfo.item}
				/>
			</label>
		);
	});

	//* Educational field

	const [eduInfo, setEduInfo] = React.useState([
		{
			id: nanoid(),
			title: "",
			place: "",
		},
	]);

	function handleEduChange(e, id) {
		// console.log(id);
		const { name, value } = e.target;
		setEduInfo((prevData) => {
			return prevData.map((item) =>
				item.id === id ? { ...item, [name]: value } : item
			);
		});
		// console.log(eduInfo);
	}

	function newField() {
		setEduInfo((prevData) => [
			...prevData,
			{ id: nanoid(), title: "", place: "", date: "" },
		]);
	}

	function deleteField(id) {
		// console.log(id);
		setEduInfo((prevData) => {
			return prevData.filter((item) => item.id !== id);
		});
	}

	const eduElements = eduInfo.map((item) => (
		<div
			key={item.id}
			className="form-field-container"
		>
			<label>
				Title of Study
				<input
					type="text"
					onChange={() => handleEduChange(event, item.id)}
					name="title"
					value={item.title}
				/>
			</label>
			<label>
				Place of Study
				<input
					type="text"
					onChange={() => handleEduChange(event, item.id)}
					name="place"
					value={item.place}
				/>
			</label>
			<label>
				Date
				<input
					type="text"
					onChange={() => handleEduChange(event, item.id)}
					name="date"
					value={item.date}
				/>
			</label>
			{eduInfo.length > 1 && (
				<button onClick={() => deleteField(item.id)}>Delete</button>
			)}
		</div>
	));

	return (
		<div className="App">
			<div className="form-container">
				<h1>Cv Maker</h1>
				<section className="form-section">
					<h2>Enter Your details</h2>
					<div className="form-field-container">{generalInputElements}</div>

					<h2>Enter your Educational Details</h2>
					{eduElements}
					<button onClick={newField}>Add</button>
				</section>
			</div>

			<Preview
				genInfo={generalInfo}
				eduInfo={eduInfo}
			/>
		</div>
	);
}

export default App;
