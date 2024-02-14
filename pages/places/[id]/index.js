import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";

const ImageContainer = styled.div`
  position: relative;
  height: 15rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: place,
    isLoading,
    error,
    comments,
  } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function deletePlace() {
    console.log("deleted?");
  }

  // SOLUTION ONE: (not f#cking arround)

  // async function deletePlace() {
  //   // Send a DELETE request to your backend server
  //   await fetch(`/api/places/${id}`, {
  //     method: "DELETE",
  //   }),
  //   router.push("/");
  //   return;
  // }
  //===============================
  // SOLUTION TWO: (some add ons)

  async function deletePlace() {
    if (confirm("are you sure?")) {
      if (confirm("are really you sure?")) {
        if (confirm("last chance: really, REALLY sure??")) {
          if (
            confirm(
              "I know what you are thinking: were there five or six sures? Well... Are you feeling lucky, Punk?"
            )
          ) {
            await fetch(`/api/places/${id}`, {
              method: "DELETE",
            });
            router.push("/");
            return;
          }
        }
      }
    }
  }
  //===============================

  //Solution THREE: (Good old js no react)
  // const App = () => {
  //   const [data, setData] = useState([]);

  //   // Fetch data from MongoDB
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('YOUR_API_ENDPOINT'); // Replace with your API endpoint
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   const handleDelete = async (id) => {
  //     try {
  //       await axios.delete(`YOUR_API_ENDPOINT/${id}`); // Replace with your API endpoint
  //       fetchData(); // Refresh data after deletion
  //     } catch (error) {
  //       console.error('Error deleting data:', error);
  //     }
  //   };

  //   return (
  //     <div>
  //       <h1>Entries</h1>
  //       <ul>
  //         {data.map((entry) => (
  //           <li key={entry._id}>
  //             {entry.name}{' '}
  //             <button onClick={() => handleDelete(entry._id)}>Delete</button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  // export default App;

  return (
    <>
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <h2>
        {place.name}, {place.location}
      </h2>
      <Link href={place.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <p>{place.description}</p>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledLink>Edit</StyledLink>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={place.name} comments={comments} />
    </>
  );
}
