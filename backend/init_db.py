import os
import argparse
parser = argparse.ArgumentParser(description='Initialize Database')
parser.add_argument("-m", "--mode", choices=('debug', 'release'),required = True,type=str, help="Choose Mode")
args = parser.parse_args()
mode = args.mode

if mode == 'debug':
    """Order matters
    """
    files = [   r'.\forum\fixtures\user_test.json',
                r'.\forum\fixtures\section_test.json',
                r'.\forum\fixtures\college_test.json',
                r'.\forum\fixtures\course_test.json',
                r'.\forum\fixtures\teacher_test.json',
                r'.\forum\fixtures\thread_test.json',
                r'.\forum\fixtures\sub_test.json',
                r'.\forum\fixtures\reply_test.json',
                r'.\forum\fixtures\replyreply_test.json',
                r'.\forum\fixtures\message_test.json',
                r'.\forum\fixtures\ann_test.json',
               # r'.\forum\fixtures\area_test.json'
            ]
    total = len(files)
    print("{} fixtures found".format(total))
    
    count = 1
    for file in files:
        print("({}/{}) Loading {}...".format(count,total,file))
        os.system("python manage.py loaddata %s" % file)
        count += 1