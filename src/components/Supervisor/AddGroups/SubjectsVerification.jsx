import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSubjects } from '../../../hooks/Subjects/useSubjects';
import Loader from '../../Global/Loader/Loader'

const SubjectTable = () => {
    const navigate = useNavigate();
    const { getSubjects } = useSubjects();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjects = await getSubjects();

                if (!subjects) {
                    throw new Error('Error getting subjects');
                }

                // Transform fetched subjects into the desired rows structure
                const transformedRows = subjects.map((subject) => ({
                    code: subject.course_code,
                    subjectName: subject.courseName,
                    yes: false,
                    no: false,
                }));

                setRows(transformedRows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubjects();
    }, []);

    const handleCheckboxChange = (index, field) => {
        setRows((prevRows) =>
            prevRows.map((row, idx) =>
                idx === index
                    ? { ...row, yes: field === 'yes', no: field === 'no' }
                    : row
            )
        );
    };

    const handleClickNext = () => {
        navigate('upload-docs');
    }

    // Check if all rows have "yes" selected
    const allYesSelected = rows.every((row) => row.yes);

    return (
        rows.length <= 0 ? (
            <Loader/>
        ) : (
        <div className="mt-9 mr-32">
            <span className="text-left">
                <p>Please confirm that if the students have cleared all the Prerequisites of FYP-I</p>
            </span>
            <table className="w-full border-collapse text-left mt-6 border-2">
                <thead>
                    <tr>
                        <th className="text-base text-gray-500 px-4 py-3 border-y-2 bg-gray-200">Code</th>
                        <th className="text-base text-gray-500 px-4 py-3 border-y-2 bg-gray-200">Subject Name</th>
                        <th className="text-base text-gray-500 px-4 py-3 border-y-2 bg-gray-200">Yes</th>
                        <th className="text-base text-gray-500 px-4 py-3 border-y-2 bg-gray-200">No</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} className="text-left">
                            <td className="px-4 py-3 border-b-2">{row.code}</td>
                            <td className="px-4 py-3 border-b-2">{row.subjectName}</td>
                            <td className="px-4 py-3 border-b-2">
                                <input
                                    type="checkbox"
                                    checked={row.yes}
                                    onChange={() => handleCheckboxChange(index, 'yes')}
                                    className="size-5"
                                />
                            </td>
                            <td className="px-4 py-2 border-b-2">
                                <input
                                    type="checkbox"
                                    checked={row.no}
                                    onChange={() => handleCheckboxChange(index, 'no')}
                                    className="size-5"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-8 text-right">
                <button
                    className={`py-4 px-8 rounded ${
                        allYesSelected ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                    disabled={!allYesSelected}
                    onClick={handleClickNext}
                >
                    Next &gt;&gt;
                </button>
            </div>
        </div>
    ));
};

export default SubjectTable;
