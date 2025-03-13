import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ClassList from '../components/class/ClassList';

function IndividualClassListPage() {
  const { courseId } = useParams();

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Class List</h1>
        <ClassList courseId={courseId} />
      </div>
    </DashboardLayout>
  );
}

export default IndividualClassListPage;
