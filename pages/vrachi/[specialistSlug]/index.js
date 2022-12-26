import { findSpecialistBySlug } from '@/api-lib/db/specialist';
import { getMongoDb } from '@/api-lib/mongodb';
import Doctor from '@/components/Doctors/Doctor';

export default function DoctorPage({ doctor }) {
  if (typeof doctor.createdAt !== 'string') {
    doctor.createdAt = new Date(doctor.createdAt);
  }
  return (
    <>
      <Doctor doctor={doctor} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const doctor = await findSpecialistBySlug(db, context.params.specialistSlug);
  if (!doctor) {
    return {
      notFound: true,
    };
  }

  doctor._id = String(doctor._id);
  doctor.slug = String(doctor.slug);
  doctor.name = String(doctor.name);
  doctor.experience = String(doctor.experience);
  doctor.speciality = String(doctor.speciality);
  doctor.education = String(doctor.education);
  doctor.creatorId = String(doctor.creatorId);
  doctor.creator._id = String(doctor.creator._id);
  doctor.createdAt = doctor.createdAt.toJSON();
  return { props: { doctor } };
}
