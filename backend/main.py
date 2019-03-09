import cognitive_face as CF
import cv2

from feedback import FeedbackModule

KEY = ''  # Replace with a valid subscription key (keeping the quotes in place).
CF.Key.set(KEY)
BASE_URL = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0'  # Replace with your regional Base URL
CF.BaseUrl.set(BASE_URL)

try:
    CF.person_group.create("conversationpartners")
except:
    pass

def identify(faceId):
    global CF
    try:
        return CF.face.identify([faceId], "conversationpartners")
    except:
        return [{"candidates":[]}]

def new_person(name, rect):
    global CF
    facerect = "{},{},{},{}".format(rect["left"], rect["top"], rect["width"], rect["height"])
    person_id = CF.person.create("conversationpartners", name)["personId"]
    CF.person.add_face('temp.jpg', "conversationpartners", person_id, target_face=facerect)
    CF.person_group.train("conversationpartners")
    return person_id

def get_image_caption(image):
    global CF
    try:
        status = CF.person_group.get_status("conversationpartners")
        if status["status"] == "running":
            return ("training in progress")
    except:
        pass
    cv2.imwrite("temp.jpg", image)
    img = cv2.imencode('.jpg', image)[1].tostring()
    faces = CF.face.detect('temp.jpg', attributes='age,gender,emotion')

    for face in faces:
        print(FeedbackModule.load_new_emotion(face, identify, new_person))

    return ("image_caption")

stream = cv2.VideoCapture(0)
key = None
count = 0
overlay_text = ""

while True:
    if count % 3 != 0:
        # Read frames from live web cam stream
        (grabbed, frame) = stream.read()

        # Make copies of the frame for transparency processing
        output = frame.copy()

        # Get caption to overlay
        if count % 50 == 0:
            overlay_text = get_image_caption(output)

        # Overlay caption on image
        cv2.putText(output, overlay_text, (10, 30),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)

        # Show the frame
        cv2.imshow("Image", output)
        key = cv2.waitKey(1) & 0xFF

    count +=1
    # Press q to break out of the loop
    if key == ord("q"):
        break

# cleanup
stream.release()
cv2.waitKey(1)
cv2.destroyAllWindows()
cv2.waitKey(1)
