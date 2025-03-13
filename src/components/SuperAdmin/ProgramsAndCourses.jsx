import { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

function ProgramsAndCourses() {
  const [programs, setPrograms] = useState([]);
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  useEffect(() => {
    // Mock data fetch
    const fetchPrograms = async () => {
      try {
        // In a real app, replace with actual API call
        const mockPrograms = [
          {
            id: 1,
            name: 'Bachelor of Computer Science',
            code: 'BCS',
            department: 'Computer Science',
            duration: '4 years',
            studentCount: 145,
            courses: [
              { id: 1, code: 'CS101', name: 'Introduction to Programming', credits: 3, lecturer: 'Dr. John Smith' },
              { id: 2, code: 'CS201', name: 'Data Structures', credits: 4, lecturer: 'Dr. Jane Doe' },
              { id: 3, code: 'CS301', name: 'Algorithms', credits: 4, lecturer: 'Prof. Robert Johnson' },
            ]
          },
          {
            id: 2,
            name: 'Bachelor of Business Administration',
            code: 'BBA',
            department: 'Business School',
            duration: '3 years',
            studentCount: 230,
            courses: [
              { id: 4, code: 'BUS101', name: 'Introduction to Business', credits: 3, lecturer: 'Dr. Emily Brown' },
              { id: 5, code: 'BUS201', name: 'Financial Accounting', credits: 4, lecturer: 'Prof. Michael Wilson' },
              { id: 6, code: 'BUS301', name: 'Marketing Principles', credits: 3, lecturer: 'Dr. Sarah Lee' },
            ]
          },
          {
            id: 3,
            name: 'Master of Data Science',
            code: 'MDS',
            department: 'Computer Science',
            duration: '2 years',
            studentCount: 78,
            courses: [
              { id: 7, code: 'DS501', name: 'Statistical Learning', credits: 4, lecturer: 'Prof. Alan Johnson' },
              { id: 8, code: 'DS502', name: 'Machine Learning', credits: 4, lecturer: 'Dr. Lisa Chen' },
              { id: 9, code: 'DS503', name: 'Big Data Analytics', credits: 3, lecturer: 'Dr. David Wang' },
            ]
          }
        ];
        
        setPrograms(mockPrograms);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPrograms();
  }, []);

  const toggleProgramExpansion = (programId) => {
    if (expandedProgram === programId) {
      setExpandedProgram(null);
    } else {
      setExpandedProgram(programId);
    }
  };

  const handleAddProgram = () => {
    setShowAddProgramModal(true);
  };

  const handleAddCourse = (programId) => {
    setShowAddCourseModal(programId);
  };

  const handleEditProgram = (program) => {
    console.log('Edit program:', program);
    // Implement edit logic
  };

  const handleDeleteProgram = (program) => {
    if (window.confirm(`Are you sure you want to delete ${program.name}?`)) {
      console.log('Delete program:', program);
      setPrograms(programs.filter(p => p.id !== program.id));
    }
  };

  const handleEditCourse = (course, programId) => {
    console.log('Edit course:', course, 'in program:', programId);
    // Implement edit logic
  };

  const handleDeleteCourse = (course, programId) => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      console.log('Delete course:', course, 'from program:', programId);
      setPrograms(programs.map(program => {
        if (program.id === programId) {
          return {
            ...program,
            courses: program.courses.filter(c => c.id !== course.id)
          };
        }
        return program;
      }));
    }
  };

  const filteredPrograms = programs.filter(program => 
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Programs and Courses</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage academic programs and their associated courses
          </p>
        </div>
        <button
          onClick={handleAddProgram}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Program
        </button>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-200">
        <div className="relative max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <ArrowPathIcon className="mx-auto h-10 w-10 animate-spin text-gray-400" />
          <p className="mt-2 text-gray-500">Loading programs...</p>
        </div>
      ) : filteredPrograms.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No programs found</p>
        </div>
      ) : (
        <div className="px-4 py-5 sm:p-6">
          <ul className="divide-y divide-gray-200">
            {filteredPrograms.map((program) => (
              <li key={program.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-lg font-medium text-gray-900">{program.name}</h4>
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {program.code}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="truncate">Department: {program.department}</span>
                      <span className="mx-2">•</span>
                      <span>Duration: {program.duration}</span>
                      <span className="mx-2">•</span>
                      <span>Students: {program.studentCount}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProgram(program)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(program)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toggleProgramExpansion(program.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {expandedProgram === program.id ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                {expandedProgram === program.id && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-medium text-gray-700">Courses</h5>
                      <button
                        onClick={() => handleAddCourse(program.id)}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusIcon className="-ml-0.5 mr-1 h-4 w-4" />
                        Add Course
                      </button>
                    </div>
                    <div className="mt-1 bg-gray-50 overflow-hidden rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Code
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Credits
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Lecturer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {program.courses.map(course => (
                            <tr key={course.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.lecturer}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                  onClick={() => handleEditCourse(course, program.id)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteCourse(course, program.id)}
                                  className="text-red-600 hover:text-red-900 ml-2"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProgramsAndCourses;